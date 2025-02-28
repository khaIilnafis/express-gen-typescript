/**
 * Server router initialization constants
 * Contains router initialization code for different server configurations
 */

/**
 * Type definition for server router initialization
 */
export interface ServerRouterInit {
  DEFAULT: string;
  SOCKETIO: string;
  WS: string;
}

/**
 * Router initialization code for different WebSocket libraries
 */
export const ROUTER_INIT = Object.freeze({
  DEFAULT: "const router = initializeRoutes();",
  SOCKETIO: "const router = initializeRoutes(this.io);",
  WS: "const router = initializeRoutes(this.wss);",
} as const) satisfies ServerRouterInit; 