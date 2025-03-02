import { ProjectDirectories } from "./directories.js";
import { ProjectFiles } from "./files.js";

import { AuthFilePaths } from "./auth.js";
import { BINFilePaths } from "./bin.js";
import { CommonFilePaths } from "./common.js";
import { ConfigFilePaths } from "./config.js";
import { ControllersFilePaths } from "./controllers.js";
import { DatabaseFilePaths } from "./database.js";
import { FileExtensions } from "./extensions.js";
import { ModelFilePaths } from "./model.js";
import { RouteFilePaths } from "./routes.js";
import { ServerFilePaths } from "./server.js";
import { ServicesFilePaths } from "./services.js";
import { SocketFilePaths } from "./socket.js";
import {
  TemplateViewPaths,
  ViewLayouts,
  ViewPages,
  ViewPartials,
} from "./view.js";
/**
 * Type definitions for the project structure
 */
interface ProjectStructure {
  DIRECTORIES: ProjectDirectories;
  FILES: ProjectFiles;
}

export {
  ProjectStructure,
  AuthFilePaths,
  BINFilePaths,
  CommonFilePaths,
  ConfigFilePaths,
  ControllersFilePaths,
  DatabaseFilePaths,
  FileExtensions,
  ModelFilePaths,
  ProjectDirectories,
  ProjectFiles,
  RouteFilePaths,
  ServerFilePaths,
  ServicesFilePaths,
  SocketFilePaths,
  TemplateViewPaths,
  ViewLayouts,
  ViewPages,
  ViewPartials,
};
