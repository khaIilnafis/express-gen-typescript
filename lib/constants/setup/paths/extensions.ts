/**
 * View engine extensions constants
 * Contains file extension constants for different template engines
 */

/**
 * Type definition for view engine extensions
 */
export interface FileExtensions {
  TS: string;
  AST: string;
  REL_PATH: string;
}

/**
 * View engine extension constants
 * Defines file extensions for each supported template engine
 */
export const EXTENSIONS = Object.freeze({
  TS: ".ts",
  AST: ".ast.ts",
  REL_PATH: "./"
} as const) satisfies FileExtensions;
 