/**
 * WebSocket paths constants
 * Contains file path patterns for WebSocket-related files
 */

/**
 * Type definition for WebSocket directory paths
 */
export interface WebSocketDirectoryPaths {
  ROOT: string;
  HANDLERS: string;
}

/**
 * Type definition for WebSocket file paths
 */
export interface WebSocketFilePaths {
  SOCKETIO: {
    SETUP: string;
    INDEX: string;
    HANDLER: string;
  };
  WS: {
    SETUP: string;
    INDEX: string;
    HANDLER: string;
  };
}

/**
 * Type definition for WebSocket paths
 */
export interface WebSocketPaths {
  DIRECTORIES: WebSocketDirectoryPaths;
  FILES: WebSocketFilePaths;
}

/**
 * WebSocket path constants
 * Defines file paths for WebSocket-related files
 */
export const PATHS = Object.freeze({
  DIRECTORIES: {
    ROOT: "sockets",
    HANDLERS: "sockets/handlers",
  },
  FILES: {
    SOCKETIO: {
      SETUP: "sockets/setup.ts",
      INDEX: "sockets/index.ts",
      HANDLER: "sockets/handlers/socketHandler.ts",
    },
    WS: {
      SETUP: "sockets/setup.ts",
      INDEX: "sockets/index.ts",
      HANDLER: "sockets/handlers/wsHandler.ts",
    },
  },
} as const) satisfies WebSocketPaths; 