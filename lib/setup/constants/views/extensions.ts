/**
 * View engine extensions constants
 * Contains file extension constants for different template engines
 */

import { ViewEngineExtensions } from "../../types/views/index.js";

/**
 * View engine extension constants
 * Defines file extensions for each supported template engine
 */
export const EXTENSIONS = Object.freeze({
  PUG: ".pug",
  EJS: ".ejs",
  HANDLEBARS: ".handlebars",
} as const) satisfies ViewEngineExtensions;
