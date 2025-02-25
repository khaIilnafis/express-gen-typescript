import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Template variables interface
 */
export interface TemplateVariables {
  [key: string]: string | number | boolean;
}

/**
 * Loads a template file and replaces placeholders with values
 * @param templatePath - Path to the template file
 * @param variables - Object containing variables to inject into the template
 * @returns The processed template content
 */
export function loadTemplate(
  templatePath: string,
  variables: TemplateVariables = {}
): string {
  // Check if template exists
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  // Read template content
  let content = fs.readFileSync(templatePath, "utf8");

  // Replace variables in the format {{variableName}}
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    content = content.replace(regex, String(variables[key]));
  });

  return content;
}

/**
 * Loads and writes a template to a destination file
 * @param templatePath - Path to the template file
 * @param destinationPath - Path where the processed template should be written
 * @param variables - Object containing variables to inject into the template
 */
export function writeTemplate(
  templatePath: string,
  destinationPath: string,
  variables: TemplateVariables = {}
): void {
  const content = loadTemplate(templatePath, variables);

  // Ensure directory exists
  const dir = path.dirname(destinationPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write content to destination
  fs.writeFileSync(destinationPath, content);
}

/**
 * Gets the absolute path to a template file
 * @param relativePath - Path relative to the templates directory
 * @returns Absolute path to the template file
 */
export function getTemplatePath(relativePath: string): string {
  return path.join(__dirname, "..", "templates", relativePath);
}

// Export all functions as a default object as well for backwards compatibility
export default {
  loadTemplate,
  writeTemplate,
  getTemplatePath,
};
