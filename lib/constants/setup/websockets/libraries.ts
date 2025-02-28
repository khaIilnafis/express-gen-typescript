/**
 * WebSocket libraries constants
 * Contains constants related to supported WebSocket libraries
 */

/**
 * Type definition for WebSocket libraries
 */
export interface WebSocketLibraries {
  NONE: string;
  SOCKETIO: string;
  WS: string;
}

/**
 * WebSocket libraries constants
 * Defines all supported WebSocket libraries
 */
export const LIBRARIES = Object.freeze({
  NONE: "none",
  SOCKETIO: "socketio",
  WS: "ws",
} as const) satisfies WebSocketLibraries; 