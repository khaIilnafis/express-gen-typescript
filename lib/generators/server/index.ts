import { FunctionExpressionIR } from "../../types/config.js";
import {
  ImportConfig,
  MethodExpressionIR,
  ImportsFromConfig,
  PropertiesIR,
  PropertyIR,
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
const routerDeclaration: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  arguments: [],
  declarations: [
    {
      id: "router",
      init: {
        type: "function_call",
        value: "initializeRoutes",
        arguments: [
          {
            type: "property_access",
            target: "this",
            property: "io",
          },
        ],
      },
    },
  ],
};
const apiRoutes: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "use",
  },
  arguments: [
    {
      type: "literal",
      value: "/api",
    },
    {
      type: "identifier",
      value: "router",
    },
  ],
};
const api404: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "use",
  },
  arguments: [
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "req",
            type: "Request",
          },
          {
            name: "res",
            type: "Response",
          },
          {
            name: "next",
            type: "NextFunction",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "res.status(404)",
              property: "json",
            },
            arguments: [
              {
                type: "object",
                properties: {
                  error: {
                    type: "literal",
                    value: "Not Found",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
const rootHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "get",
  },
  arguments: [
    {
      type: "literal",
      value: "/",
    },
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "req",
            type: "Request",
          },
          {
            name: "res",
            type: "Response",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "res",
              property: "render",
            },
            arguments: [
              {
                type: "literal",
                value: "index",
              },
              {
                type: "object",
                properties: {
                  title: {
                    type: "literal",
                    value: "Express TypeScript App",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
// New initializeRoutes generator object
const detailedInitializeRoutes = {
  ROUTER_DECLARATION: routerDeclaration,
  API_ROUTES: apiRoutes,
  ROOT_HANDLER: rootHandler,
  API_404_HANDLER: api404,
};
// 404 handler middleware
const notFoundHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "use",
  },
  arguments: [
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "req",
            type: "Request",
          },
          {
            name: "res",
            type: "Response",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "res.status(404)",
              property: "json",
            },
            arguments: [
              {
                type: "object",
                properties: {
                  message: {
                    type: "literal",
                    value: "Not Found",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

// Global error handler middleware
const errorHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "use",
  },
  arguments: [
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "error",
            type: "any",
          },
          {
            name: "req",
            type: "Request",
          },
          {
            name: "res",
            type: "Response",
          },
          {
            name: "next",
            type: "NextFunction",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "console",
              property: "error",
            },
            arguments: [
              {
                type: "identifier",
                value: "error",
              },
            ],
          },
          {
            expressionType: "method_call",
            target: {
              object: "res.status(500)",
              property: "json",
            },
            arguments: [
              {
                type: "object",
                properties: {
                  message: {
                    type: "literal",
                    value: "Internal Server Error",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
const detailedErrorHandling = {
  NOT_FOUND_HANDLER: notFoundHandler,
  GLOBAL_ERROR_HANDLER: errorHandler,
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
const properties: PropertiesIR<{
  appProperty: PropertyIR;
  serverProperty: PropertyIR;
  portProperty: PropertyIR;
  ioProperty: PropertyIR;
}> = {
  appProperty,
  serverProperty,
  portProperty,
  ioProperty,
};
// For the bind variable declaration in the error handler
const bindVariableDeclaration: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  arguments: [],
  declarations: [
    {
      id: "bind",
      init: {
        type: "conditional_expression",
        test: {
          type: "binary_expression",
          operator: "===",
          left: {
            type: "unary_expression",
            unaryOperator: "typeof",
            arguments: [
              {
                type: "identifier",
                value: "port",
              },
            ],
          },
          right: {
            type: "literal",
            value: "string",
          },
        },
        consequent: {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "literal",
            value: "Pipe ",
          },
          right: {
            type: "identifier",
            value: "port",
          },
        },
        alternate: {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "literal",
            value: "Port ",
          },
          right: {
            type: "identifier",
            value: "port",
          },
        },
      },
    },
  ],
};

// For the EACCES case in the error handler
const eaccessErrorCase: MethodExpressionIR = {
  expressionType: "switch_case",
  target: { object: "", property: "" },
  arguments: [],
  caseValue: "EACCES",
  statements: [
    {
      expressionType: "method_call",
      target: { object: "console", property: "error" },
      arguments: [
        {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "identifier",
            value: "bind",
          },
          right: {
            type: "property_access",
            target: "err",
            property: "message",
          },
        },
      ],
    },
    {
      expressionType: "method_call",
      target: { object: "process", property: "exit" },
      arguments: [
        {
          type: "literal",
          value: 1,
        },
      ],
    },
  ],
};

// For the EADDRINUSE case in the error handler
const eaddrInUseErrorCase: MethodExpressionIR = {
  expressionType: "switch_case",
  target: { object: "", property: "" },
  arguments: [],
  caseValue: "EADDRINUSE",
  statements: [
    {
      expressionType: "method_call",
      target: { object: "console", property: "error" },
      arguments: [
        {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "identifier",
            value: "bind",
          },
          right: {
            type: "property_access",
            target: "err",
            property: "message",
          },
        },
      ],
    },
    {
      expressionType: "method_call",
      target: { object: "process", property: "exit" },
      arguments: [
        {
          type: "literal",
          value: 1,
        },
      ],
    },
  ],
};

// For the default case in the error handler
const defaultErrorCase: MethodExpressionIR = {
  expressionType: "switch_case",
  target: { object: "", property: "" },
  arguments: [],
  caseValue: null, // null for default case
  statements: [
    {
      expressionType: "throw",
      target: { object: "", property: "" },
      arguments: [
        {
          type: "identifier",
          value: "err",
        },
      ],
    },
  ],
};

// For the switch statement in the error handler
const errorSwitch: MethodExpressionIR = {
  expressionType: "switch_statement",
  target: { object: "", property: "" },
  arguments: [],
  discriminant: {
    type: "property_access",
    target: "err",
    property: "name",
  },
  cases: [eaccessErrorCase, eaddrInUseErrorCase, defaultErrorCase],
};
// const errorHandlerBody = {
//   BIND_DECLARATION: bindVariableDeclaration,
//   ERROR_SWITCH: errorSwitch,
// };
// For the server.listen callback function
const listenCallback: FunctionExpressionIR = {
  type: "arrow_function",
  parameters: [],
  body: [
    {
      expressionType: "method_call",
      target: { object: "console", property: "log" },
      arguments: [
        {
          type: "template_literal",
          quasis: [
            { text: "Server running on port ", isExpression: false },
            { text: "", isExpression: false },
          ],
          expressions: [
            {
              type: "identifier",
              value: "port",
            },
          ],
        },
      ],
    },
  ],
};

// For the server.listen call
const serverListenCall: MethodExpressionIR = {
  expressionType: "method_call",
  target: { object: "this.server", property: "listen" },
  arguments: [
    {
      type: "identifier",
      value: "port",
    },
    {
      type: "function_call",
      functionExpression: listenCallback,
    },
  ],
};

// For the server.on('error') call
const serverErrorHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: { object: "this.server", property: "on" },
  arguments: [
    {
      type: "literal",
      value: "error",
    },
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "err",
            type: "Error",
          },
        ],
        body: [bindVariableDeclaration, errorSwitch],
      },
    },
  ],
};
const detailedListenMethod = {
  SERVER_LISTEN: serverListenCall,
  ERROR_HANDLER: serverErrorHandler,
};
export const SERVER_CONFIG = Object.freeze({
  IMPORTS: imports,
  INIT: init,
  CONSTRUCTOR: constructorCalls,
  WEBSOCKETS: initWebSockets,
  BOOTSTRAP: bootstrap,
  DB_CONNECT: connectToDatabase,
  ROUTES: detailedInitializeRoutes,
  PROPERTIES: properties,
  ERROR_HANDLING: detailedErrorHandling,
  LISTEN: detailedListenMethod,
});

// Export the new generator
export { ExpressServerGenerator } from "./generator.js";
