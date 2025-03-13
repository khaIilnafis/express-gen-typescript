import { PropertyIR } from "../../types/config.js";
import {
  ImportConfig,
  MethodExpressionIR,
  ImportsFromConfig,
} from "../../types/index.js";

const imports: ImportsFromConfig<{
  ENV: ImportConfig;
  PATH: ImportConfig;
  HTTP: ImportConfig;
  ROUTES: ImportConfig;
  DATABASE: ImportConfig;
}> = {
  ENV: {
    NAME: "dotenv/config",
    DEFAULT: {
      EXPRESS: "dotenv",
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
  ROUTES: {
    NAME: "./routes",
    DEFAULT: {},
    NAMED: {
      INIT: "initializeRoutes",
    },
  },
  DATABASE: {
    NAME: "./database",
    DEFAULT: {},
    NAMED: {
      DATBASE: "initializeDatabase",
    },
  },
};
const init: MethodExpressionIR = {
  target: { object: "this", property: "server" },
  expressionType: "assignment",
  arguments: [
    {
      type: "function_call",
      value: "",
      target: "http",
      property: "createServer",
      arguments: [
        {
          type: "property_access",
          value: "",
          target: "this",
          property: "app",
        },
      ],
    },
  ],
};
const initExpressInstance: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  expressionType: "assignment",
  arguments: [{ type: "function_call", value: "express" }],
};
const initServerInstance: MethodExpressionIR = {
  target: { object: "this", property: "server" },
  expressionType: "assignment",
  arguments: [
    {
      type: "function_call",
      value: "",
      target: "http",
      property: "createServer",
      arguments: [
        {
          type: "property_access",
          value: "",
          target: "this",
          property: "app",
        },
      ],
    },
  ],
};
const setPort: MethodExpressionIR = {
  target: { object: "this", property: "port" },
  expressionType: "assignment",
  arguments: [
    {
      type: "logical_expression",
      operator: "||",
      left: {
        type: "property_access",
        target: "process.env",
        property: "PORT",
      },
      right: { type: "literal", value: 3000 },
    },
  ],
};
const initializeMiddlewares: MethodExpressionIR = {
  target: { object: "this", property: "initializeMiddlewares" },
  expressionType: "method_call",
  arguments: [],
};
const initalizeWebsockets: MethodExpressionIR = {
  target: { object: "this", property: "initializeWebSockets" },
  expressionType: "method_call",
  arguments: [],
};
const initializeRoutes: MethodExpressionIR = {
  target: { object: "this", property: "initializeRoutes" },
  expressionType: "method_call",
  arguments: [],
};
const initializeErrorHandling: MethodExpressionIR = {
  target: { object: "this", property: "initializeErrorHandling" },
  expressionType: "method_call",
  arguments: [],
};
const initalizeConnectToDatabase: MethodExpressionIR = {
  target: { object: "Server", property: "connectToDatabase" },
  expressionType: "method_call",
  arguments: [],
};
const constructorCalls = {
  initExpressInstance,
  initServerInstance,
  setPort,
  initializeMiddlewares,
  initalizeWebsockets,
  initializeRoutes,
  initializeErrorHandling,
  initalizeConnectToDatabase,
};
const ioAssignmentExpression: MethodExpressionIR = {
  expressionType: "assignment",
  target: {
    object: "this",
    property: "io",
  },
  method: "=",
  arguments: [
    {
      type: "constructor_call",
      value: "SocketIOServer",
      arguments: [
        {
          type: "property_access",
          target: "this",
          property: "server",
        },
        {
          type: "object",
          properties: {
            cors: {
              type: "object",
              properties: {
                origin: {
                  type: "literal",
                  value: "*",
                },
              },
            },
          },
        },
      ],
    },
  ],
};
const onConnectionExpression: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this",
    property: "io",
  },
  method: "on",
  arguments: [
    {
      type: "literal",
      value: "connection",
    },
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "socket",
            type: "Socket",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "console",
              property: "log",
            },
            // method: "",
            arguments: [
              {
                type: "literal",
                isTemplate: true,
                templateParts: [
                  { text: "Socket connected: ", isExpression: false },
                  { text: "", isExpression: true },
                ],
                templateExpressions: [
                  {
                    type: "property_access",
                    target: "socket",
                    property: "id",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};
const initWebSockets = {
  ASSIGNMENT: ioAssignmentExpression,
  LISTENER: onConnectionExpression,
};

const bootstrap: MethodExpressionIR = {
  expressionType: "return",
  target: { object: "this", property: "" },
  arguments: [
    {
      type: "constructor_call",
      value: "Server",
      arguments: [],
    },
  ],
};
const connectToDatabase: MethodExpressionIR = {
  expressionType: "try_catch",
  target: { object: "", property: "" },
  arguments: [],
  tryCatchBlock: {
    tryBlock: [
      {
        expressionType: "await",
        target: { object: "", property: "" },
        arguments: [
          { type: "function_call", value: "initializeDatabase", arguments: [] },
        ],
      },
      {
        expressionType: "method_call",
        target: { object: "console", property: "log" },
        arguments: [
          {
            type: "literal",
            value: "Database connection established successfully.",
          },
        ],
      },
    ],
    catchParameter: "error",
    catchBlock: [
      {
        expressionType: "method_call",
        target: { object: "console", property: "error" },
        arguments: [
          { type: "literal", value: "Database connection error:" },
          { type: "identifier", value: "error" },
        ],
      },
    ],
  },
};
// For: public app: Application;
const appProperty: PropertyIR = {
  key: "app",
  accessModifier: "public",
  type: "Application",
};

// For: public server: http.Server;
const serverProperty: PropertyIR = {
  key: "server",
  accessModifier: "public",
  type: "http.Server",
};

// For: public port: number | string;
const portProperty: PropertyIR = {
  key: "port",
  accessModifier: "public",
  type: "number | string",
};

// For: public io!: SocketIOServer;
const ioProperty: PropertyIR = {
  key: "io",
  accessModifier: "public",
  type: "SocketIOServer",
  hasDefiniteAssignment: true,
};
const properties = {
  appProperty,
  serverProperty,
  portProperty,
  ioProperty,
};
export const SERVER_CONFIG = Object.freeze({
  IMPORTS: imports,
  INIT: init,
  CONSTRUCTOR: constructorCalls,
  WEBSOCKETS: initWebSockets,
  BOOTSTRAP: bootstrap,
  DB_CONNECT: connectToDatabase,
  PROPERTIES: properties,
});
