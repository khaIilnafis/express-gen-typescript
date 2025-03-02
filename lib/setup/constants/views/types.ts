/**
 * View engine types constants
 * Contains constants related to supported template engines
 */

import { ViewEngineTypes } from "../../types/views/index.js";

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
