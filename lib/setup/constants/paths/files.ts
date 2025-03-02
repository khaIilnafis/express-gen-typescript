import { BIN } from "./bin.js";
import { AUTH } from "./auth.js";
import { DATABASE } from "./database.js";
import { MODELS } from "./model.js";
import { SERVER } from "./server.js";
import { SERVICES } from "./services.js";
import { SOCKETS } from "./socket.js";
import { COMMON } from "./common.js";
import { CONFIG } from "./config.js";
import { VIEWS } from "./view.js";
import { ROUTES } from "./routes.js";
import { CONTROLLERS } from "./controllers.js";
import { EXTENSIONS } from "./extensions.js";
import { ProjectFiles } from "../../types/paths/index.js";

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
  COMMON,
  EXTENSIONS,
} as const) satisfies ProjectFiles;
