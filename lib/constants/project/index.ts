/**
 * Project structure constants
 * Contains constants related to project directories and file structure
 */

import { DIRECTORIES, ProjectDirectories } from "./directories.js";
import { FILES, ProjectFiles } from "./files.js";

/**
 * Type definitions for the project structure
 */
export interface ProjectStructure {
  DIRECTORIES: ProjectDirectories;
  FILES: ProjectFiles;
}

/**
 * Re-export individual constant objects
 */
export { DIRECTORIES, FILES };
export type { ProjectDirectories, ProjectFiles };

/**
 * Main project structure constants
 * Combines all project-related constants into a unified structure
 */
export const PROJECT = Object.freeze({
  /**
   * Project directories structure
   * Re-exported from directories.ts
   */
  DIRECTORIES,
  
  /**
   * Project file structure and paths
   * Re-exported from files.ts
   */
  FILES
} as const) satisfies ProjectStructure; 