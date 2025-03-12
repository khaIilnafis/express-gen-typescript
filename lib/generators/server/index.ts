import {
  ImportConfig,
  MethodExpressionIR,
  ImportsFromConfig,
} from "../../types/index.js";

const serverImports: ImportsFromConfig<{
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
const serverInit: MethodExpressionIR = {
  target: { object: "this", property: "server" },
  method: "=",
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
  method: "=",
  arguments: [{ type: "function_call", value: "express" }],
};
const initServerInstance: MethodExpressionIR = {
  target: { object: "this", property: "server" },
  method: "=",
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
  method: "=",
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

const serverConstructorCalls = {
  initExpressInstance,
  initServerInstance,
  setPort,
  initializeMiddlewares: {
    target: { object: "this", property: "initializeMiddlewares" },
    method: "call",
    arguments: [],
  },
  initalizeWebsockets: {
    target: { object: "this", property: "initializeWebSockets" },
    method: "call",
    arguments: [],
  },
  initializeRoutes: {
    target: { object: "this", property: "initializeRoutes" },
    method: "call",
    arguments: [],
  },
  initializeErrorHandling: {
    target: { object: "this", property: "initializeErrorHandling" },
    method: "call",
    arguments: [],
  },
  connectToDatabase: {
    target: { object: "Server", property: "connectToDatabase" },
    method: "call",
    arguments: [],
  },
};
export const SERVER = Object.freeze({
  IMPORTS: serverImports,
  INIT: serverInit,
  CONSTRUCTOR: serverConstructorCalls,
});
