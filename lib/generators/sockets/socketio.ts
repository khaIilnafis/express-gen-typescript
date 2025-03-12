import { ImportConfig, ImportsFromConfig } from "../../types/index.js";

const socketIoImports: ImportsFromConfig<{
  SOCKETIO: ImportConfig;
}> = {
  SOCKETIO: {
    NAME: "socket.io",
    DEFAULT: {},
    NAMED: {
      SERVER: ["Server", "SocketIOServer"],
      SOCKET: "Socket",
    },
  },
};

export const SOCKETIO = Object.freeze({
  IMPORTS: socketIoImports,
});
