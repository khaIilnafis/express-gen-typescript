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
