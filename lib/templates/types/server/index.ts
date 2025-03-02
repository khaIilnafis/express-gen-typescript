/**
 * Server types
 */

import { ServerImports } from "./imports.js";
import { ServerClassProperties } from "./class-properties.js";
import { ServerConstructorCalls } from "./constructor-calls.js";
import { ServerMiddleware } from "./middleware.js";
import { ServerWebsocketMethods } from "./websocket.js";
import { ServerRouterInit } from "./router.js";
import { ServerViewEngineSetup } from "./view-engine.js";
import { ServerRootRouteHandler, ServerViewRouteHandler } from "./routes.js";
import { ServerTypeDeclarations } from "./types.js";

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
  VIEW_ROUTE_HANDLER: ServerViewRouteHandler;
  TYPE_DECLARATIONS: ServerTypeDeclarations;
}

export type {
  ServerImports,
  ServerClassProperties,
  ServerConstructorCalls,
  ServerMiddleware,
  ServerWebsocketMethods,
  ServerRouterInit,
  ServerViewEngineSetup,
  ServerRootRouteHandler,
  ServerViewRouteHandler,
  ServerTypeDeclarations,
};
