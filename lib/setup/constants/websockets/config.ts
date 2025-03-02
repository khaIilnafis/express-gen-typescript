/**
 * WebSocket configuration constants
 * Contains configuration settings for WebSocket libraries
 */

import { WebSocketConfig } from "../../types/websockets/index.js";

/**
 * WebSocket configuration constants
 * Defines configuration settings for different WebSocket libraries
 */
export const CONFIG = Object.freeze({
  SOCKETIO: {
    CORS: {
      ORIGIN: "*", // Default to allow all origins
      METHODS: ["GET", "POST"],
    },
    PATH: "/socket.io",
  },
  WS: {
    PING_INTERVAL: 30000, // 30 seconds
    CLOSE_TIMEOUT: 10000, // 10 seconds
  },
} as const) satisfies WebSocketConfig;
