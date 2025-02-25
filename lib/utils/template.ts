import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Get the directory name equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Template utilities for handling file templates
 */

/**
 * Get the absolute path to a template file
 * @param {string} relativePath - Path relative to the templates directory
 * @returns {string} Absolute path to the template file
 */
function getTemplatePath(relativePath: string): string {
  return path.join(__dirname, "../../templates", relativePath);
}

/**
 * Render a template with variables
 * @param {string} templatePath - Path to the template file
 * @param {Object} variables - Variables to inject into the template
 * @returns {string} Rendered template
 */
function renderTemplate(
  templatePath: string,
  variables: Record<string, any> = {}
): string {
  // Read the template file
  let templateContent = fs.readFileSync(templatePath, "utf8");

  // Replace variables in the template
  Object.entries(variables).forEach(([key, value]) => {
    if (value !== undefined) {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
      templateContent = templateContent.replace(regex, value);
    }
  });

  // Process conditionals
  templateContent = processConditionals(templateContent, variables);

  return templateContent;
}

/**
 * Process conditional blocks in templates
 * @param {string} content - Template content
 * @param {Object} variables - Variables for condition evaluation
 * @returns {string} Processed template
 */
function processConditionals(
  content: string,
  variables: Record<string, any>
): string {
  // Process if blocks
  let processedContent = content;
  const ifBlockRegex =
    /\{\{\s*#if\s+([a-zA-Z0-9_]+)\s*\}\}([\s\S]*?)\{\{\s*\/if\s*\}\}/g;

  processedContent = processedContent.replace(
    ifBlockRegex,
    (match, condition, blockContent) => {
      return variables[condition] ? blockContent : "";
    }
  );

  // Process if-else blocks
  const ifElseBlockRegex =
    /\{\{\s*#if\s+([a-zA-Z0-9_]+)\s*\}\}([\s\S]*?)\{\{\s*#else\s*\}\}([\s\S]*?)\{\{\s*\/if\s*\}\}/g;

  processedContent = processedContent.replace(
    ifElseBlockRegex,
    (match, condition, ifBlock, elseBlock) => {
      return variables[condition] ? ifBlock : elseBlock;
    }
  );

  return processedContent;
}

/**
 * Create a directory for the template file if it doesn't exist
 * @param {string} filePath - Path to the file
 */
function ensureDirectoryExists(filePath: string): void {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

/**
 * Load all templates from a directory
 * @param {string} templatesDir - Path to the templates directory
 * @returns {Object} Map of template paths to template contents
 */
function loadTemplates(templatesDir: string): Record<string, string> {
  const templates: Record<string, string> = {};

  function readTemplatesRecursive(dir: string, basePath: string = ""): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const currentPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        readTemplatesRecursive(currentPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith(".template")) {
        const templateKey = relativePath.replace(".template", "");
        templates[templateKey] = fs.readFileSync(currentPath, "utf8");
      }
    }
  }

  readTemplatesRecursive(templatesDir);
  return templates;
}

export {
  getTemplatePath,
  renderTemplate,
  ensureDirectoryExists,
  loadTemplates,
};
