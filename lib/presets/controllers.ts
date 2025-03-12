import { CALLEES } from "../types/config.js";
import { ConstructorDefinitionIR } from "../types/index.js";
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
    },
  },
  exampleController: {
    imports: {
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
        SOCKETIO: {
          NAME: "socket.io",
          DEFAULT: {},
          NAMED: {
            SERVER: ["Server", "SocketIOServer"],
          },
        },
      },
      exports: {
        DEFAULT: {
          EXAMPLE: "ExampleController",
        },
        NAMED: {},
      },
      class: {
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
      methods: {
        parameters: [
          // Define any parameters the constructor should take
          // For WebSockets example:
          { name: "io", type: "SocketIOServer", isOptional: true },
        ],
        expressions: [
          // Store the io parameter if needed
          {
            target: { object: "this", property: "io" },
            method: "=",
            arguments: [{ type: "identifier", value: "io" }],
          },
          // Controller methods
          {
            target: { object: "this", property: "getAll" },
            method: "=",
            arguments: [
              {
                type: "function_call",
                value: "getAllController",
                arguments: [{ type: "identifier", value: "io" }],
              },
            ],
          },
          {
            target: { object: "this", property: "getById" },
            method: "=",
            arguments: [
              {
                type: "function_call",
                value: "getByIdController",
                arguments: [{ type: "identifier", value: "io" }],
              },
            ],
          },
          {
            target: { object: "this", property: "create" },
            method: "=",
            arguments: [
              {
                type: "function_call",
                value: "createController",
                arguments: [{ type: "identifier", value: "io" }],
              },
            ],
          },
          {
            target: { object: "this", property: "update" },
            method: "=",
            arguments: [
              {
                type: "function_call",
                value: "updateController",
                arguments: [{ type: "identifier", value: "io" }],
              },
            ],
          },
          {
            target: { object: "this", property: "delete" },
            method: "=",
            arguments: [
              {
                type: "function_call",
                value: "deleteController",
                arguments: [{ type: "identifier", value: "io" }],
              },
            ],
          },
        ],
      } as ConstructorDefinitionIR,
    },
  },
};
