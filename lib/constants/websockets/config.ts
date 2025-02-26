/**
 * WebSocket configuration constants
 * Contains configuration settings for WebSocket libraries
 */

/**
 * Type definition for Socket.IO configuration
 */
export interface SocketIOConfig {
  CORS: {
    ORIGIN: string;
    METHODS: readonly string[];
  };
  PATH: string;
}

/**
 * Type definition for native WebSocket configuration
 */
export interface WSConfig {
  PING_INTERVAL: number; // milliseconds
  CLOSE_TIMEOUT: number; // milliseconds
}

/**
 * Type definition for WebSocket configuration
 */
export interface WebSocketConfig {
  SOCKETIO: SocketIOConfig;
  WS: WSConfig;
}

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