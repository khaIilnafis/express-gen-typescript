import { WebSocketLogs } from "../../types/logs/index.js";

/**
 * Application log constants
 */
export const SOCKET_LOGS: WebSocketLogs = Object.freeze({
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
  CONFIG: {
    SUCCESS: (socketLib: string): string => `${socketLib} setup completed`,
  },
});
