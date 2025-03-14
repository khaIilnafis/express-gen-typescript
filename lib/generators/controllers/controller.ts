import { ImportConfig, ImportsFromConfig } from "../../types/index.js";

const IMPORTS: ImportsFromConfig<{
  SOCKETIO: ImportConfig;
  EXPRESS: ImportConfig;
}> = {
  SOCKETIO: {
    NAME: "socket.io",
    DEFAULT: {},
    NAMED: {
      SERVER: ["Server", "SocketIOServer"],
    },
  },
  EXPRESS: {
    NAME: "express",
    DEFAULT: {},
    NAMED: {
      REQUEST: "Request",
      RESPONSE: "Response",
      NEXT: "NextFunction",
    },
  },
};
export const CONTROLLER = Object.freeze({
  IMPORTS,
});
