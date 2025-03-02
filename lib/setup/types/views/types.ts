/**
 * Type definition for view engine types
 */
export interface ViewEngineTypes {
  NONE: string;
  PUG: string;
  EJS: string;
  HANDLEBARS: string;
}

/**
 * View engine type constants
 * Defines all supported view engine types
 */
export const TYPES = Object.freeze({
  NONE: "none",
  PUG: "pug",
  EJS: "ejs",
  HANDLEBARS: "handlebars",
} as const) satisfies ViewEngineTypes;
