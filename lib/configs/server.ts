export const serverConfig = {
  SERVER: {
    imports: {
      EXPRESS: {
        NAME: "express",
        DEFAULT: {},
        NAMED: {
          APPLICATION: "Application",
          REQUEST: "Request",
          RESPONSE: "Response",
          NEXT: "NextFunction",
        },
      },
      HELMET: {
        NAME: "helmet",
        DEFAULT: {
          HELMET: "helmet",
        },
        NAMED: {},
      },
      CORS: {
        NAME: "cors",
        DEFAULT: {
          CORS: "cors",
        },
        NAMED: {},
      },
      MORGAN: {
        NAME: "morgan",
        DEFAULT: {
          MORGAN: "morgan",
        },
        NAMED: {},
      },
      PATH: {
        NAME: "path",
        DEFAULT: {
          PATH: "path",
        },
        NAMED: {},
      },
      HTTP: {
        NAME: "http",
        DEFAULT: {
          HTTP: "http",
        },
        NAMED: {},
      },
      SEQUELIZE: {
        NAME: "sequelize",
        DEFAULT: {
          SEQUELIZE: "sequelize",
        },
        NAMED: {},
      },
      PASSPORT: {
        NAME: "passport",
        DEFAULT: {
          PASSPORT: "passport",
        },
        NAMED: {},
      },
      EJS: {
        NAME: "passport",
        DEFAULT: {
          EJS: "ejs",
        },
        NAMED: {},
      },
      DATBASE: {
        NAME: "./database",
        DEFAULT: {},
        NAMED: {
          DATBASE: "initializeDatabase",
        },
      },
      SOCKETIO: {
        NAME: "socket.io",
        DEFAULT: {},
        NAMED: {
          SERVER: ["Server", "SocketIOServer"],
          SOCKET: "Socket",
        },
      },
      ROUTES: {
        NAME: "./routes",
        DEFAULT: {},
        NAMED: {
          INIT: "initializeRoutes",
        },
      },
    },
  },
};
