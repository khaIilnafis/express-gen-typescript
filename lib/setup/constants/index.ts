/**
 * Project structure constants
 * Contains constants related to project directories and file structure
 */
import { ProjectConstants } from "../types/index.js";
import { APP } from "./app/index.js";
import { DATABASE } from "./database/index.js";
import { DEPENDENCIES } from "./dependencies/index.js";
import { LOGS } from "./logs/index.js";
import { PATHS } from "./paths/index.js";
import { VIEWS } from "./views/index.js";
import { WEBSOCKETS } from "./websockets/index.js";

/**
 * Re-export individual log constant objects
 */
export { APP, DATABASE, DEPENDENCIES, LOGS, PATHS, VIEWS, WEBSOCKETS };

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
  VIEWS,
  WEBSOCKETS,
} as const) satisfies ProjectConstants;
