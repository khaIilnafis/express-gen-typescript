import { ProjectDirectories, DIRECTORIES } from "./directories.js"; 
import { ProjectFiles, FILES } from "./files.js";

/**
 * Type definitions for the project structure
 */
export interface ProjectStructure {
	DIRECTORIES: ProjectDirectories;
	FILES: ProjectFiles;
}
  
/**
 * File paths constants
 * Rexport all directory and file paths used in the project structure
 */
export const PATHS = Object.freeze({
	DIRECTORIES,
	FILES
}as const) satisfies ProjectStructure;