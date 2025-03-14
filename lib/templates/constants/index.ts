/**
 * Templates domain constants
 * Organizes and exports template-related constants
 */
import { STRINGS } from "./strings/index.js";
import { COMMENTS } from "./comments/index.js";
import { AUTH } from "./auth/index.js";
import { SERVER } from "./server/index.js";
import { ERRORS } from "./errors.js";
import { TemplateStructure } from "../types/index.js";

// Re-export individual template constants
export { STRINGS, COMMENTS, AUTH, SERVER, ERRORS };

/**
 * Combined template constants
 */
export const TEMPLATES = Object.freeze({
  AUTH,
  STRINGS,
  COMMENTS,
  SERVER,
  ERRORS,
} as const) satisfies TemplateStructure;
