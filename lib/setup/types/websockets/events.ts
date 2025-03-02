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
