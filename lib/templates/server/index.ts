import IMPORTS from "./defaults/imports.js";
import CONSTRUCTOR from "./defaults/constructor.js";
import ROUTES from "./defaults/routes.js";
import PROPERTIES from "./defaults/properties.js";
import ERROR_HANDLER from "./defaults/errorHandler.js";
import LISTEN from "./defaults/listen.js";
import { DATABASE_CONFIG } from "../../generators/databases/index.js";
import { SOCKETS_CONFIG } from "../../generators/sockets/index.js";
import { INIT, BOOTSTRAP } from "./defaults/init.js";

export const SERVER_CONFIG = Object.freeze({
  IMPORTS,
  INIT,
  CONSTRUCTOR,
  BOOTSTRAP,
  ROUTES,
  PROPERTIES,
  ERROR_HANDLER,
  LISTEN,
  DB_CONNECT: DATABASE_CONFIG.CONNECT_DATABASE,
  WEBSOCKETS: SOCKETS_CONFIG.SOCKETIO.INIT,
});
