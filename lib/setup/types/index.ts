/**
 * Project structure types
 */
import { AppStructure } from "./app/index.js";
import { DatabaseStructure } from "./database/index.js";
import { DependencyStructure } from "./dependencies/index.js";
import { ApplicationLogs } from "./logs/index.js";
import { ProjectStructure } from "./paths/index.js";
import { ViewEngineStructure } from "./views/index.js";
import { WebSocketStructure } from "./websockets/index.js";

export type {
  AppStructure,
  DatabaseStructure,
  DependencyStructure,
  ApplicationLogs,
  ProjectStructure,
  ViewEngineStructure,
  WebSocketStructure,
};

/**
 * Type definitions for the project structure
 */
export interface ProjectConstants {
  APP: AppStructure;
  DATABASE: DatabaseStructure;
  DEPENDENCIES: DependencyStructure;
  LOGS: ApplicationLogs;
  PATHS: ProjectStructure;
  VIEWS: ViewEngineStructure;
  WEBSOCKETS: WebSocketStructure;
}
