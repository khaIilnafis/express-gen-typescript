import { DatabasePrerequisites } from "./database.js";
import { DirectoryDescriptions } from "./directory.js";
import { EnvironmentFileConstants, ExampleFileConstants } from "./file.js";
import { Markers } from "./markers.js";
/**
 * Type definition for template strings
 */
interface TemplateStrings {
  DATABASE_PREREQUISITES: DatabasePrerequisites;
  DIRECTORY_DESCRIPTIONS: DirectoryDescriptions;
  ENV_FILE: EnvironmentFileConstants;
  EXAMPLE_FILE: ExampleFileConstants;
  MARKERS: Markers;
}

export {
  TemplateStrings,
  DatabasePrerequisites,
  DirectoryDescriptions,
  EnvironmentFileConstants,
  ExampleFileConstants,
  Markers,
};
