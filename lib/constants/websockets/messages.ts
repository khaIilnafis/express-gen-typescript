/**
 * WebSocket messages constants
 * Contains message strings related to WebSocket operations
 */

/**
 * Type definition for WebSocket status messages
 */
export interface WebSocketStatusMessages {
  CONNECTED: string;
  DISCONNECTED: string;
  SERVER_STARTED: string;
}

/**
 * Type definition for WebSocket error messages
 */
export interface WebSocketErrorMessages {
  CONNECTION_FAILED: string;
  INVALID_MESSAGE: string;
}

/**
 * Type definition for WebSocket library-specific messages
 */
export interface WebSocketLibraryMessages {
  SOCKETIO: {
    SETUP_SUCCESS: string;
  };
  WS: {
    SETUP_SUCCESS: string;
  };
}

/**
 * Type definition for WebSocket messages
 */
export interface WebSocketMessages {
  STATUS: WebSocketStatusMessages;
  ERROR: WebSocketErrorMessages;
  LIBRARY: WebSocketLibraryMessages;
}

/**
 * WebSocket message constants
 * Defines messages for WebSocket operations
 */
export const MESSAGES = Object.freeze({
  STATUS: {
    CONNECTED: "WebSocket client connected",
    DISCONNECTED: "WebSocket client disconnected",
    SERVER_STARTED: "WebSocket server started on port",
  },
  ERROR: {
    CONNECTION_FAILED: "Failed to establish WebSocket connection",
    INVALID_MESSAGE: "Invalid WebSocket message format",
  },
  LIBRARY: {
    SOCKETIO: {
      SETUP_SUCCESS: "Socket.IO server initialized successfully",
    },
    WS: {
      SETUP_SUCCESS: "WebSocket server initialized successfully",
    },
  },
} as const) satisfies WebSocketMessages; 