export const routesConfig = {
  module: {
    imports: {
      EXPRESS: {
        NAME: "express",
        DEFAULT: {},
        NAMED: {
          ROUTER: "Router",
        },
      },
      ROUTES: {
        NAME: "./example",
        DEFAULT: {},
        NAMED: {
          EXAMPLE: "ExampleRoutes",
        },
      },
      SOCKETIO: {
        NAME: "socket.io",
        DEFAULT: {},
        NAMED: {
          SERVER: ["Server", "SocketIOServer"],
        },
      },
    },
    exports: {
      NAMED: {},
      DEFAULT: {
        INITALIZE: "initializeRoutes",
      },
    },
  },
  example: {
    imports: {
      CONTROLLERS: {
        NAME: "../controllers/example",
        DEFAULT: {},
        NAMED: {
          EXAMPLE: "ExampleController",
        },
      },
      EXPRESS: {
        NAME: "express",
        DEFAULT: {},
        NAMED: {
          ROUTER: "Router",
        },
      },
      SOCKETIO: {
        NAME: "socket.io",
        DEFAULT: {},
        NAMED: {
          SERVER: ["Server", "SocketIOServer"],
        },
      },
      PASSPORT: {
        NAME: "passport",
        DEFAULT: { passport: "passport" },
        NAMED: {},
      },
    },
    exports: {
      NAMED: {},
      DEFAULT: {
        INITALIZE: "ExampleRoutes",
      },
    },
  },
};
