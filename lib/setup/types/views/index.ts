/**
 * View engine types
 */

import { ViewEngineTypes } from "./types.js";
import { ViewEngineExtensions } from "./extensions.js";

/**
 * Type definition for view engine structure
 */
export interface ViewEngineStructure {
  TYPES: ViewEngineTypes;
  EXTENSIONS: ViewEngineExtensions;
}

export type { ViewEngineTypes, ViewEngineExtensions };
