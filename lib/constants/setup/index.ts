/**
 * Project structure constants
 * Contains constants related to project directories and file structure
 */
import { AppStructure, APP } from "./app/index.js"
import { DatabaseStructure, DATABASE } from "./database/index.js"
import { DependencyStructure, DEPENDENCIES } from "./dependencies/index.js"
import { ApplicationLogs, LOGS } from "./logs/index.js";
import { ProjectStructure, PATHS } from "./paths/index.js";
import { ViewEngineStructure, VIEW_ENGINES } from "./viewEngines/index.js"
import { WebSocketStructure, WEBSOCKETS } from "./websockets/index.js"

/**
 * Re-export individual log constant objects
 */
export { LOGS, PATHS };
export type { ApplicationLogs, ProjectStructure };

/**
 * Type definitions for the project structure
 */
export interface ProjectConstants {
	APP: AppStructure;
	DATABASE: DatabaseStructure;
	DEPENDENCIES: DependencyStructure;
	LOGS: ApplicationLogs;
	PATHS: ProjectStructure;
	VIEW_ENGINES: ViewEngineStructure;
	WEBSOCKETS: WebSocketStructure;

}

/**
 * Main project structure constants
 * Combines all setup-related constants into a unified structure
 */
export const SETUP = Object.freeze({
	APP,
	DATABASE,
	DEPENDENCIES,
	LOGS,
	PATHS,
	VIEW_ENGINES,
	WEBSOCKETS
} as const) satisfies ProjectConstants; 