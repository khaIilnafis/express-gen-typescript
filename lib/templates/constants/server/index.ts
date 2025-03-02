/**
 * Server constants
 * Contains constants related to server configuration, imports, and middleware
 */

import { IMPORTS } from "./imports.js";
import { CLASS_PROPERTIES } from "./class-properties.js";
import { CONSTRUCTOR_CALLS } from "./constructor-calls.js";
import { MIDDLEWARE } from "./middleware.js";
import { WEBSOCKET_METHODS } from "./websocket.js";
import { ROUTER_INIT } from "./router.js";
import { VIEW_ENGINE_SETUP } from "./view-engine.js";
import { ROOT_ROUTE_HANDLER, VIEW_ROUTE_HANDLER } from "./routes.js";
import { TYPE_DECLARATIONS } from "./types.js";
import { ServerStructure } from "../../types/server/index.js";

/**
 * Re-export individual server constants
 */
export {
  IMPORTS,
  CLASS_PROPERTIES,
  CONSTRUCTOR_CALLS,
  MIDDLEWARE,
  WEBSOCKET_METHODS,
  ROUTER_INIT,
  VIEW_ENGINE_SETUP,
  ROOT_ROUTE_HANDLER,
  VIEW_ROUTE_HANDLER,
  TYPE_DECLARATIONS,
};

/**
 * Main server constants
 * Combines all server-related constants into a unified structure
 */
export const SERVER = Object.freeze({
  IMPORTS,
  CLASS_PROPERTIES,
  CONSTRUCTOR_CALLS,
  MIDDLEWARE,
  WEBSOCKET_METHODS,
  ROUTER_INIT,
  VIEW_ENGINE_SETUP,
  ROOT_ROUTE_HANDLER,
  VIEW_ROUTE_HANDLER,
  TYPE_DECLARATIONS,
} as const) satisfies ServerStructure;
