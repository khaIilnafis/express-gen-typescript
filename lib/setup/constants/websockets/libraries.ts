/**
 * WebSocket libraries constants
 * Contains constants related to supported WebSocket libraries
 */

import { WebSocketLibraries } from "../../types/websockets/index.js";

/**
 * WebSocket libraries constants
 * Defines all supported WebSocket libraries
 */
export const LIBRARIES = Object.freeze({
  NONE: "none",
  SOCKETIO: "socketio",
  WS: "ws",
} as const) satisfies WebSocketLibraries;
