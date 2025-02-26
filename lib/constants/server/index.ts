/**
 * Server constants
 * Contains constants related to server configuration, imports, and middleware
 */

import { IMPORTS, ServerImports } from "./imports.js";
import { CLASS_PROPERTIES, ServerClassProperties } from "./class-properties.js";
import { CONSTRUCTOR_CALLS, ServerConstructorCalls } from "./constructor-calls.js";
import { MIDDLEWARE, ServerMiddleware } from "./middleware.js";
import { WEBSOCKET_METHODS, ServerWebsocketMethods } from "./websocket.js";
import { ROUTER_INIT, ServerRouterInit } from "./router.js";
import { VIEW_ENGINE_SETUP, ServerViewEngineSetup } from "./view-engine.js";
import { ROOT_ROUTE_HANDLER, ServerRootRouteHandler } from "./routes.js";
import { TYPE_DECLARATIONS, ServerTypeDeclarations } from "./types.js";

/**
 * Type definition for server structure
 */
export interface ServerStructure {
  IMPORTS: ServerImports;
  CLASS_PROPERTIES: ServerClassProperties;
  CONSTRUCTOR_CALLS: ServerConstructorCalls;
  MIDDLEWARE: ServerMiddleware;
  WEBSOCKET_METHODS: ServerWebsocketMethods;
  ROUTER_INIT: ServerRouterInit;
  VIEW_ENGINE_SETUP: ServerViewEngineSetup;
  ROOT_ROUTE_HANDLER: ServerRootRouteHandler;
  TYPE_DECLARATIONS: ServerTypeDeclarations;
}

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
  TYPE_DECLARATIONS,
};

export type {
  ServerImports,
  ServerClassProperties,
  ServerConstructorCalls,
  ServerMiddleware,
  ServerWebsocketMethods,
  ServerRouterInit,
  ServerViewEngineSetup,
  ServerRootRouteHandler,
  ServerTypeDeclarations,
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
  TYPE_DECLARATIONS,
} as const) satisfies ServerStructure; 