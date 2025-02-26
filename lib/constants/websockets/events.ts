/**
 * WebSocket events constants
 * Contains constants related to common WebSocket events
 */

/**
 * Type definition for common WebSocket events
 */
export interface CommonWebSocketEvents {
  CONNECTION: string;
  DISCONNECT: string;
  ERROR: string;
  MESSAGE: string;
}

/**
 * Type definition for Socket.IO specific events
 */
export interface SocketIOEvents {
  CONNECT: string;
  CONNECT_ERROR: string;
  RECONNECT: string;
  RECONNECT_ATTEMPT: string;
}

/**
 * Type definition for WebSocket events
 */
export interface WebSocketEvents {
  COMMON: CommonWebSocketEvents;
  SOCKETIO: SocketIOEvents;
}

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