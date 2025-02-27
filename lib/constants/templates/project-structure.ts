/**
 * Template project structure constants
 * Contains constants for project structure template file paths
 */

/**
 * Type definition for binary scripts templates
 */
export interface BinTemplates {
  WWW: string;
//   WWW_AST: string;
}

/**
 * Type definition for server templates
 */
export interface ServerTemplates {
  MAIN: string;
  TYPES: string;
//   AST: string;
}

/**
 * Type definition for types templates
 */
export interface TypesTemplates {
  GLOBAL: string;
//   GLOBAL_AST: string;
}

/**
 * Type definition for project structure templates
 */
export interface TemplateProjectStructure {
  BIN: BinTemplates;
  README: string;
  SERVER: ServerTemplates;
  TYPES: TypesTemplates;
}

/**
 * Template project structure constants
 * Defines file paths for project structure templates
 */
export const PROJECT_STRUCTURE = Object.freeze({
  BIN: {
    WWW: "project-structure/bin/www.ast.ts",
    // WWW_AST: "project-structure/bin/www.ast.ts",
  },
  README: "project-structure/README.md",
  SERVER: {
    MAIN: "project-structure/server.ast.ts",
    TYPES: "project-structure/server.ast.d.ts",
    // AST: "project-structure/server.ast.ts",
  },
  TYPES: {
    GLOBAL: "project-structure/types.ast.ts",
  },
} as const) satisfies TemplateProjectStructure; 