/**
 * Template project structure constants
 * Contains constants for project structure template file paths
 */

/**
 * Type definition for binary scripts templates
 */
export interface BinTemplates {
  WWW: string;
}

/**
 * Type definition for server templates
 */
export interface ServerTemplates {
  MAIN: string;
  TYPES: string;
}

/**
 * Type definition for project structure templates
 */
export interface TemplateProjectStructure {
  BIN: BinTemplates;
  README: string;
  SERVER: ServerTemplates;
}

/**
 * Template project structure constants
 * Defines file paths for project structure templates
 */
export const PROJECT_STRUCTURE = Object.freeze({
  BIN: {
    WWW: "project-structure/bin/www.ts",
  },
  README: "project-structure/README.md",
  SERVER: {
    MAIN: "project-structure/server.ts",
    TYPES: "project-structure/server.d.ts",
  },
} as const) satisfies TemplateProjectStructure; 