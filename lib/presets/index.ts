import { authExports, authImports } from "./auth.js";
import { CONTROLLER } from "./controllers.js";
import { databaseConfig } from "./database.js";
import { modelsConfig } from "./models.js";
import { routesConfig } from "./routes.js";
import { SERVER } from "./server.js";
import { socketsConfig } from "./sockets.js";
import { servicesConfig } from "./services.js";
import { MIDDLEWARE_CONFIG } from "../generators/middlwares/index.js";
import { BIN } from "./bin.js";

const AUTH_CONFIG = Object.freeze({
  authImports,
  authExports,
});
const SERVER_PRESET = Object.freeze(SERVER);
const CONTROLLER_PRESET = Object.freeze(CONTROLLER);
const BIN_PRESET = Object.freeze(BIN);

const DATABASE_CONFIG = Object.freeze({
  databaseConfig,
});
const MODEL_CONFIG = Object.freeze({
  modelsConfig,
});
const ROUTES_CONFIG = Object.freeze({
  routesConfig,
});
const SERVICES_CONFIG = Object.freeze({
  servicesConfig,
});
const SOCKETS_CONFIG = Object.freeze({
  socketsConfig,
});

export {
  AUTH_CONFIG,
  CONTROLLER_PRESET,
  DATABASE_CONFIG,
  MODEL_CONFIG,
  ROUTES_CONFIG,
  SERVER_PRESET,
  SOCKETS_CONFIG,
  SERVICES_CONFIG,
  MIDDLEWARE_CONFIG,
  BIN_PRESET,
};
