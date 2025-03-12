import { authExports, authImports } from "./auth.js";
import { controllerConfig } from "./controllers.js";
import { databaseConfig } from "./database.js";
import { modelsConfig } from "./models.js";
import { routesConfig } from "./routes.js";
import {
  middlewareMethodConfig,
  serverConstructor,
  serverImports,
} from "./server.js";
import { socketsConfig } from "./sockets.js";
import { servicesConfig } from "./services.js";
import { MIDDLEWARE_CONFIG } from "../generators/middlwares/index.js";
const AUTH_CONFIG = Object.freeze({
  authImports,
  authExports,
});
const SERVER_CONFIG = Object.freeze({
  middlewareMethodConfig,
  serverConstructor,
  serverImports,
});
const CONTROLLER_CONFIG = Object.freeze({
  controllerConfig,
});

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
  CONTROLLER_CONFIG,
  DATABASE_CONFIG,
  MODEL_CONFIG,
  ROUTES_CONFIG,
  SERVER_CONFIG,
  SOCKETS_CONFIG,
  SERVICES_CONFIG,
  MIDDLEWARE_CONFIG,
};
