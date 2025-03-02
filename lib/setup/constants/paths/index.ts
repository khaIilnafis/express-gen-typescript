import { ProjectStructure } from "../../types/paths/index.js";
import { DIRECTORIES } from "./directories.js";
import { FILES } from "./files.js";

/**
 * File paths constants
 * Rexport all directory and file paths used in the project structure
 */
export const PATHS = Object.freeze({
  DIRECTORIES,
  FILES,
} as const) satisfies ProjectStructure;
