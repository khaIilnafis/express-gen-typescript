import { ROUTES_CONFIG } from "../generators/routes/index.js";

export const ROUTES = {
  INDEX: {
    imports: ROUTES_CONFIG.INDEX.IMPORTS,
    router_declaration: ROUTES_CONFIG.INDEX.ROUTER_DECLARATION,
    root_handler: ROUTES_CONFIG.INDEX.ROOT_HANDLER,
    example_routes: ROUTES_CONFIG.INDEX.EXAMPLE_ROUTES,
    example_routes_with_sockets:
      ROUTES_CONFIG.INDEX.EXAMPLE_ROUTES_WITH_SOCKETS,
    return_router: ROUTES_CONFIG.INDEX.RETURN_ROUTER,
  },
  EXAMPLE: {
    imports: ROUTES_CONFIG.EXAMPLE.IMPORTS,
    controller_instance: ROUTES_CONFIG.EXAMPLE.CONTROLLER_INSTANCE,
    controller_with_socket: ROUTES_CONFIG.EXAMPLE.CONTROLLER_WITH_SOCKET,
    get_all_route: ROUTES_CONFIG.EXAMPLE.GET_ALL_ROUTE,
    get_by_id_route: ROUTES_CONFIG.EXAMPLE.GET_BY_ID_ROUTE,
    create_route: ROUTES_CONFIG.EXAMPLE.CREATE_ROUTE,
    create_route_with_auth: ROUTES_CONFIG.EXAMPLE.CREATE_ROUTE_WITH_AUTH,
    update_route: ROUTES_CONFIG.EXAMPLE.UPDATE_ROUTE,
    delete_route: ROUTES_CONFIG.EXAMPLE.DELETE_ROUTE,
  },
};

// Keep the old export for backward compatibility
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
