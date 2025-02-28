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
	CONFIG: WebSocketConfigLogs
  }

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
		}
	},
	CONFIG: {
		SUCCESS: (socketLib: string): string => `${socketLib} setup completed`
	}
});