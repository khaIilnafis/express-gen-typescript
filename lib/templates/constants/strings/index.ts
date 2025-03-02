/**
 * Template string constants
 * Provides centralized string templates used across the generator
 */

import { TemplateStrings } from "../../types/strings/index.js";
import { DATABASE_PREREQUISITES } from "./database.js";
import { DIRECTORY_DESCRIPTIONS } from "./directory.js";
import { ENV_FILE, EXAMPLE_FILE } from "./file.js";
import { MARKERS } from "./markers.js";

/**
 * Main template strings export
 */
export const STRINGS = Object.freeze({
  DATABASE_PREREQUISITES,
  DIRECTORY_DESCRIPTIONS,
  ENV_FILE,
  EXAMPLE_FILE,
  MARKERS,
} as const) satisfies TemplateStrings;
