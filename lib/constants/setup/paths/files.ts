import { BINFilePaths, BIN } from "./bin.js";
import { AuthFilePaths, AUTH } from "./auth.js";
import { DatabaseFilePaths, DATABASE } from "./database.js";
import { ModelFilePaths, MODELS } from "./model.js";
import { ServerFilePaths, SERVER } from "./server.js";
import { ServicesFilePaths, SERVICES } from "./services.js";
import { SocketFilePaths, SOCKETS } from "./socket.js";
import { CommonFilePaths, COMMON } from "./common.js";
import { ConfigFilePaths, CONFIG } from "./config.js";
import { TemplateViewPaths, VIEWS } from "./view.js";
import { RouteFilePaths, ROUTES } from "./routes.js";
import { CONTROLLERS, ControllersFilePaths } from "./controllers.js";

/**
 * Type definitions for file paths
 */
export interface ProjectFiles {
  BIN: BINFilePaths;
  AUTH: AuthFilePaths;
  DATABASE: DatabaseFilePaths;
  MODELS: ModelFilePaths;
  ROUTES: RouteFilePaths;
  CONTROLLERS: ControllersFilePaths;
  SERVER: ServerFilePaths;
  SERVICES: ServicesFilePaths;
  SOCKETS: SocketFilePaths;
  COMMON: CommonFilePaths;
  CONFIG: ConfigFilePaths;
  VIEWS: TemplateViewPaths;
}

/**
 * File paths constants
 * Defines all file paths and file markers used in the project structure
 */
export const FILES = Object.freeze({
	CONFIG,
	BIN,
	AUTH,
  	DATABASE,
  	MODELS,
	ROUTES,
  	CONTROLLERS,
  	SOCKETS,
	SERVER,
	SERVICES,
	VIEWS,
	COMMON
} as const) satisfies ProjectFiles; 