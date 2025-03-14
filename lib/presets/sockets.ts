import { SOCKETS_CONFIG } from "../generators/sockets/index.js";

/**
 * Socket.IO preset configuration
 */
export const SOCKETS = {
  SOCKETIO: {
    imports: SOCKETS_CONFIG.SOCKETIO.IMPORTS,
    log_connection: SOCKETS_CONFIG.SOCKETIO.LOG_CONNECTION,
    log_message: SOCKETS_CONFIG.SOCKETIO.LOG_MESSAGE,
    broadcast_message: SOCKETS_CONFIG.SOCKETIO.BROADCAST_MESSAGE,
    log_disconnection: SOCKETS_CONFIG.SOCKETIO.LOG_DISCONNECTION,
    connection_handler: SOCKETS_CONFIG.SOCKETIO.CONNECTION_HANDLER,
    setup_handlers: SOCKETS_CONFIG.SOCKETIO.SETUP_HANDLERS,
  },
};

// Keep the old export for backward compatibility
export const socketsConfig = {
  SOCKETS: {
    imports: {
      SOCKETIO: {
        NAME: "socket.io",
        DEFAULT: {},
        NAMED: {
          SERVER: ["Server", "SocketIOServer"],
        },
      },
    },
  },
};
