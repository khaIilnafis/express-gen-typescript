/**
 * Template websockets constants
 * Contains constants for websocket template file paths
 */

/**
 * Type definition for websocket library templates
 */
export interface WebsocketLibraryTemplates {
  INDEX: string;
  IMPORTS: string;
  METHODS: string;
}

/**
 * Type definition for websocket templates
 */
export interface TemplateWebsockets {
  SOCKETIO: WebsocketLibraryTemplates;
  WS: WebsocketLibraryTemplates;
}

/**
 * Template websockets constants
 * Defines file paths for websocket templates
 */
export const WEBSOCKETS = Object.freeze({
  SOCKETIO: {
    INDEX: "websockets/socketio/index.ts",
    IMPORTS: "websockets/socketio/imports.ts",
    METHODS: "websockets/socketio/methods.ts",
  },
  WS: {
    INDEX: "websockets/ws/index.ts",
    IMPORTS: "websockets/ws/imports.ts",
    METHODS: "websockets/ws/methods.ts",
  },
} as const) satisfies TemplateWebsockets; 