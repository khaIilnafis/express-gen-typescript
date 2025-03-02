/**
 * Server router initialization constants
 * Contains router initialization code for different server configurations
 */

import { ServerRouterInit } from "../../types/server/index.js";

export const ROUTER_INIT = Object.freeze({
  DEFAULT: "const router = initializeRoutes();",
  SOCKETIO: "const router = initializeRoutes(this.io);",
  WS: "const router = initializeRoutes(this.wss);",
} as const) satisfies ServerRouterInit;
