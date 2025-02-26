/**
 * View engine constants
 * Contains constants related to template engines, extensions, and configuration
 */

import { TYPES, ViewEngineTypes } from "./types.js";
import { EXTENSIONS, ViewEngineExtensions } from "./extensions.js";
import { CONFIG, ViewEngineConfig } from "./config.js";
import { PATHS, ViewEnginePaths } from "./paths.js";

/**
 * Type definition for view engine structure
 */
export interface ViewEngineStructure {
  TYPES: ViewEngineTypes;
  EXTENSIONS: ViewEngineExtensions;
  CONFIG: ViewEngineConfig;
  PATHS: ViewEnginePaths;
}

/**
 * Re-export individual view engine constants
 */
export {
  TYPES,
  EXTENSIONS,
  CONFIG,
  PATHS,
};

export type {
  ViewEngineTypes,
  ViewEngineExtensions,
  ViewEngineConfig,
  ViewEnginePaths,
};

/**
 * Main view engine constants
 * Combines all view engine-related constants into a unified structure
 */
export const VIEW_ENGINES = Object.freeze({
  TYPES,
  EXTENSIONS,
  CONFIG,
  PATHS,
} as const) satisfies ViewEngineStructure; 