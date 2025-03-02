/**
 * View engine constants
 * Contains constants related to template engines, extensions, and configuration
 */

import { TYPES } from "./types.js";
import { EXTENSIONS } from "./extensions.js";
import { ViewEngineStructure } from "../../types/views/index.js";

/**
 * Re-export individual view engine constants
 */
export { TYPES, EXTENSIONS };

/**
 * Main view engine constants
 * Combines all view engine-related constants into a unified structure
 */
export const VIEWS = Object.freeze({
  TYPES,
  EXTENSIONS,
} as const) satisfies ViewEngineStructure;
