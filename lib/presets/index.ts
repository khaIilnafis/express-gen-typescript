import { authExports, authImports } from "./auth.js";
import { CONTROLLER } from "./controllers.js";
import { databaseConfig } from "./database.js";
import { modelsConfig } from "./models.js";
import { ROUTES } from "./routes.js";
import { SERVER } from "./server.js";
import { socketsConfig, SOCKETS } from "./sockets.js";
import { servicesConfig, SERVICES } from "./services.js";
import { MIDDLEWARE_CONFIG } from "../generators/middlwares/index.js";
import { BIN } from "./bin.js";

const AUTH_CONFIG = Object.freeze({
  authImports,
  authExports,
});

const SERVER_PRESET = Object.freeze(SERVER);
const CONTROLLER_PRESET = Object.freeze(CONTROLLER);
const BIN_PRESET = Object.freeze(BIN);
const ROUTES_PRESET = Object.freeze(ROUTES);
const SERVICES_PRESET = Object.freeze(SERVICES);
const SOCKETS_PRESET = Object.freeze(SOCKETS);

const DATABASE_CONFIG = Object.freeze({
  databaseConfig,
});
const MODEL_CONFIG = Object.freeze({
  modelsConfig,
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
  ROUTES_PRESET,
  SERVER_PRESET,
  SERVICES_CONFIG,
  SERVICES_PRESET,
  SOCKETS_CONFIG,
  SOCKETS_PRESET,
  MIDDLEWARE_CONFIG,
  BIN_PRESET,
};
