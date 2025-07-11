import {
  BIN,
  CONTROLLER,
  MIDDLEWARE_CONFIG,
  ROUTES,
  SERVER,
  SERVICES,
  SOCKETS,
  authExports,
  authImports,
  databaseConfig,
  modelsConfig,
  servicesConfig,
  socketsConfig,
} from "./defaults/index.js";

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
  BIN,
  CONTROLLER,
  ROUTES,
  SERVER,
  SERVICES,
  SOCKETS,
  authExports,
  authImports,
  databaseConfig,
  modelsConfig,
  servicesConfig,
  socketsConfig,
};
