/**
 * View engine constants
 * Contains constants related to template engines, extensions, and configuration
 */

import { TYPES, ViewEngineTypes } from "./types.js";
import { EXTENSIONS, ViewEngineExtensions } from "./extensions.js";

/**
 * Type definition for view engine structure
 */
export interface ViewEngineStructure {
  TYPES: ViewEngineTypes;
  EXTENSIONS: ViewEngineExtensions;
}

/**
 * Re-export individual view engine constants
 */
export {
  TYPES,
  EXTENSIONS,
};

export type {
  ViewEngineTypes,
  ViewEngineExtensions,
};

/**
 * Main view engine constants
 * Combines all view engine-related constants into a unified structure
 */
export const VIEW_ENGINES = Object.freeze({
  TYPES,
  EXTENSIONS
} as const) satisfies ViewEngineStructure; 