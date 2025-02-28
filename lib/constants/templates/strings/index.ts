/**
 * Template string constants
 * Provides centralized string templates used across the generator
 */

import { DatabasePrerequisites, DATABASE_PREREQUISITES } from "./database.js";
import { DirectoryDescriptions, DIRECTORY_DESCRIPTIONS } from "./directory.js";
import { EnvironmentFileConstants, ExampleFileConstants, ENV_FILE, EXAMPLE_FILE } from "./file.js";
import { Markers, MARKERS } from "./markers.js";
/**
 * Type definition for template strings
 */
export interface TemplateStrings {
  DATABASE_PREREQUISITES: DatabasePrerequisites;
  DIRECTORY_DESCRIPTIONS: DirectoryDescriptions;
  ENV_FILE: EnvironmentFileConstants;
  EXAMPLE_FILE: ExampleFileConstants
  MARKERS: Markers
}

/**
 * Main template strings export
 */
export const TEMPLATE_STRINGS = Object.freeze({
  DATABASE_PREREQUISITES,
  DIRECTORY_DESCRIPTIONS,
  ENV_FILE,
  EXAMPLE_FILE,
  MARKERS
} as const) satisfies TemplateStrings; 