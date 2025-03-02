/**
 * Type definition for WebSocket status logs
 */
export interface WebSocketStatusLogs {
  CONNECTED: string;
  DISCONNECTED: string;
  SERVER_STARTED: string;
}

/**
 * Type definition for WebSocket error logs
 */
export interface WebSocketErrorLogs {
  CONNECTION_FAILED: string;
  INVALID_MESSAGE: string;
}

/**
 * Type definition for WebSocket library-specific logs
 */
export interface WebSocketLibraryLogs {
  SOCKETIO: {
    SETUP_SUCCESS: string;
  };
  WS: {
    SETUP_SUCCESS: string;
  };
}
export interface WebSocketConfigLogs {
  SUCCESS: (socketLib: string) => string;
}
/**
 * Type definition for WebSocket logs
 */
export interface WebSocketLogs {
  STATUS: WebSocketStatusLogs;
  ERROR: WebSocketErrorLogs;
  LIBRARY: WebSocketLibraryLogs;
  CONFIG: WebSocketConfigLogs;
}
