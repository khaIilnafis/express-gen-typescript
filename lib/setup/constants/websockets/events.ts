/**
 * WebSocket events constants
 * Contains constants related to common WebSocket events
 */

import { WebSocketEvents } from "../../types/websockets/index.js";

/**
 * WebSocket events constants
 * Defines common events for WebSocket communication
 */
export const EVENTS = Object.freeze({
  COMMON: {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    ERROR: "error",
    MESSAGE: "message",
  },
  SOCKETIO: {
    CONNECT: "connect",
    CONNECT_ERROR: "connect_error",
    RECONNECT: "reconnect",
    RECONNECT_ATTEMPT: "reconnect_attempt",
  },
} as const) satisfies WebSocketEvents;
