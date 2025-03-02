import { BINFilePaths } from "./bin.js";
import { AuthFilePaths } from "./auth.js";
import { DatabaseFilePaths } from "./database.js";
import { ModelFilePaths } from "./model.js";
import { ServerFilePaths } from "./server.js";
import { ServicesFilePaths } from "./services.js";
import { SocketFilePaths } from "./socket.js";
import { CommonFilePaths } from "./common.js";
import { ConfigFilePaths } from "./config.js";
import { TemplateViewPaths } from "./view.js";
import { RouteFilePaths } from "./routes.js";
import { ControllersFilePaths } from "./controllers.js";
import { FileExtensions } from "./extensions.js";
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
  EXTENSIONS: FileExtensions;
}
