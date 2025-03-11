import { CALLEES, ExportConfig } from "../types/index.js";

// Configuration for controllers
export const controllerConfig = {
  module: {
    imports: {
      CONTROLLER: {
        NAME: "./example",
        DEFAULT: {},
        NAMED: {
          EXAMPLE: "ExampleController",
        },
      },
    },
    exports: {
      DEFAULT: {},
      NAMED: {
        EXAMPLE: "ExampleController",
      },
    } as ExportConfig,
  },
  exampleController: {
    imports: {
      CONTROLLER: {
        NAME: "./exampleController",
        DEFAULT: {},
        NAMED: {
          GETALL: "getAllController",
          GETBYID: "getByIdController",
          CREATE: "createController",
          UPDATE: "updateController",
          DELETE: "deleteController",
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
    constructor: {
      imports: {
        CONTROLLER: {
          NAME: "./exampleController",
          DEFAULT: {},
          NAMED: {
            GETALL: "getAllController",
            GETBYID: "getByIdController",
            CREATE: "createController",
            UPDATE: "updateController",
            DELETE: "deleteController",
          },
        },
      },
      methods: {
        GET_ALL: {
          METHOD: "getAll",
          CALLER: "getAllController",
          CALLE: CALLEES.THIS,
        },
        GET_BY_ID: {
          METHOD: "getById",
          CALLER: "getByIdController",
          CALLE: CALLEES.THIS,
        },
        CREATE: {
          METHOD: "create",
          CALLER: "createController",
          CALLE: CALLEES.THIS,
        },
        UPDATE: {
          METHOD: "update",
          CALLER: "updateController",
          CALLE: CALLEES.THIS,
        },
        DELETE: {
          METHOD: "delete",
          CALLER: "deleteController",
          CALLE: CALLEES.THIS,
        },
      },
    },
  },
};
