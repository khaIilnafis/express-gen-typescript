import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GeneratorOptions, TemplateOptions } from "./types.js";

// Get the directory name equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Options interface for AST template generation
 */
export interface ASTTemplateOptions {
  [key: string]: string | boolean | number | null | undefined;
}

/**
 * Ensures the template path is valid for import
 * Handles different environments (development vs production)
 * @param templatePath - Original template path
 * @returns A path that can be properly imported
 */
function normalizeTemplatePath(templatePath: string): string {
	console.log(`Template path: ${templatePath}`);
  // Check if the file exists (development mode)
  if (fs.existsSync(templatePath)) {
    return templatePath;
  }

  // In production, try with .js extension
  const jsPath = templatePath.replace(/\.ast\.ts$/, '.ast.js');
  if (fs.existsSync(jsPath)) {
    return jsPath;
  }

  // If neither exists, return the original (let the import system throw appropriate error)
  console.warn(`Warning: Could not find template at ${templatePath} or ${jsPath}`);
  return templatePath;
}

/**
 * Executes an AST template file and returns the generated code
 * @param templatePath - Path to the AST template file
 * @param options - Options to pass to the AST template generator
 * @returns Promise with the generated code as a string
 */
export async function processASTTemplate(
  templatePath: string,
  options: TemplateOptions
): Promise<string> {
  try {
	console.log(options);
    // Normalize the template path before importing
    const normalizedPath = normalizeTemplatePath(templatePath);
    
    // Import the template module dynamically
    const templateModule = await import(normalizedPath);
    
    // Call the default export function with options
    const ast = templateModule.default(options);
    
    // If the result is already a string, return it directly
    if (typeof ast === 'string') {
      return ast;
    }
    
    // Otherwise, assume it's an AST and print it using the module's print function
    if (templateModule.print) {
      return templateModule.print(ast);
    }
    
    // If no print function is exported, throw an error
    throw new Error("Template module must export a 'print' function if it doesn't return a string");
  } catch (error) {
    console.error("Error processing AST template:", error);
    throw error;
  }
}

/**
 * Processes an AST template and writes the output to a destination file
 * @param astTemplatePath - Path to the AST template file
 * @param destinationPath - Path where the generated code should be written
 * @param options - Options to pass to the AST template generator
 */
export async function writeASTTemplate(
  astTemplatePath: string,
  destinationPath: string,
  options: TemplateOptions = {}
): Promise<void> {
  try {
    const generatedCode = await processASTTemplate(astTemplatePath, options);
    // Ensure directory exists
    const dir = path.dirname(destinationPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write generated code to destination
    fs.writeFileSync(destinationPath, generatedCode);
  } catch (error) {
    console.error("Error processing AST template:", error);
    throw error;
  }
}

/**
 * Gets the absolute path to an AST template file
 * @param relativePath - Path relative to the templates directory
 * @returns Absolute path to the AST template file
 */
export function getASTTemplatePath(relativePath: string): string {
  // In production, we need to replace .ast.ts with .ast.js
  // because the TypeScript files are compiled to JavaScript
  if (process.env.NODE_ENV !== 'development') {
    relativePath = relativePath.replace(/\.ast\.ts$/, '.ast.js');
  }
  console.log(`RelativePath: ${relativePath}`)
  let templatePath = path.join(__dirname, "..", "templates", relativePath);
  return templatePath
}

// Export default object for consistency with template-loader.ts
export default {
  processASTTemplate,
  writeASTTemplate,
  getASTTemplatePath
}; 