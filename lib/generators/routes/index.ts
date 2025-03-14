import {
  ImportConfig,
  MethodExpressionIR,
  ImportsFromConfig,
  ParameterIR,
} from "../../types/index.js";

/**
 * Routes Index Configurations
 */
const imports: ImportsFromConfig<{
  EXPRESS: ImportConfig;
  ROUTES: ImportConfig;
  SOCKETIO: ImportConfig;
}> = {
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
};

/**
 * Routes declarations
 */
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
        value: "Router",
        arguments: [],
      },
    },
  ],
};

/**
 * Root route handler
 */
const rootRouteHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "router",
    property: "get",
  },
  arguments: [
    {
      type: "literal",
      value: "/",
    },
    {
      type: "function_call",
      value: "",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          { name: "req", type: "any" } as ParameterIR,
          { name: "res", type: "any" } as ParameterIR,
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "res",
              property: "json",
            },
            arguments: [
              {
                type: "object",
                properties: {
                  message: {
                    type: "literal",
                    value: "Welcome to Express TypeScript API",
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

/**
 * Register example routes
 */
const exampleRoutesRegistration: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "ExampleRoutes",
    property: "create",
  },
  arguments: [
    {
      type: "identifier",
      value: "router",
    },
  ],
};

const exampleRoutesWithSocketsRegistration: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "ExampleRoutes",
    property: "create",
  },
  arguments: [
    {
      type: "identifier",
      value: "router",
    },
    {
      type: "identifier",
      value: "io",
    },
  ],
};

/**
 * Return router expression
 */
const returnRouter: MethodExpressionIR = {
  expressionType: "return",
  target: {
    object: "",
    property: "",
  },
  arguments: [
    {
      type: "identifier",
      value: "router",
    },
  ],
};

/**
 * Example routes imports
 */
const exampleImports: ImportsFromConfig<{
  CONTROLLERS: ImportConfig;
  EXPRESS: ImportConfig;
  SOCKETIO: ImportConfig;
  PASSPORT: ImportConfig;
}> = {
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
};

/**
 * Example routes class methods
 */
const controllerInstance: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  arguments: [],
  declarations: [
    {
      id: "controller",
      init: {
        type: "constructor_call",
        value: "ExampleController",
        arguments: [],
      },
    },
  ],
};

const controllerWithSocketInstance: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  arguments: [],
  declarations: [
    {
      id: "controller",
      init: {
        type: "constructor_call",
        value: "ExampleController",
        arguments: [
          {
            type: "identifier",
            value: "io",
          },
        ],
      },
    },
  ],
};

const getAllRoute: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "router",
    property: "get",
  },
  arguments: [
    {
      type: "literal",
      value: "/examples",
    },
    {
      type: "property_access",
      target: "controller",
      property: "getAll",
    },
  ],
};

const getByIdRoute: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "router",
    property: "get",
  },
  arguments: [
    {
      type: "literal",
      value: "/examples/:id",
    },
    {
      type: "property_access",
      target: "controller",
      property: "getById",
    },
  ],
};

const createRoute: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "router",
    property: "post",
  },
  arguments: [
    {
      type: "literal",
      value: "/examples",
    },
    {
      type: "property_access",
      target: "controller",
      property: "create",
    },
  ],
};

const createRouteWithAuth: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "router",
    property: "post",
  },
  arguments: [
    {
      type: "literal",
      value: "/examples",
    },
    {
      type: "function_call",
      target: "passport",
      property: "authenticate",
      arguments: [
        {
          type: "literal",
          value: "jwt",
        },
      ],
    },
    {
      type: "property_access",
      target: "controller",
      property: "create",
    },
  ],
};

const updateRoute: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "router",
    property: "put",
  },
  arguments: [
    {
      type: "literal",
      value: "/examples/:id",
    },
    {
      type: "property_access",
      target: "controller",
      property: "update",
    },
  ],
};

const deleteRoute: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "router",
    property: "delete",
  },
  arguments: [
    {
      type: "literal",
      value: "/examples/:id",
    },
    {
      type: "property_access",
      target: "controller",
      property: "delete",
    },
  ],
};

// Route index configuration
const INDEX = {
  IMPORTS: imports,
  ROUTER_DECLARATION: routerDeclaration,
  ROOT_HANDLER: rootRouteHandler,
  EXAMPLE_ROUTES: exampleRoutesRegistration,
  EXAMPLE_ROUTES_WITH_SOCKETS: exampleRoutesWithSocketsRegistration,
  RETURN_ROUTER: returnRouter,
};

// Example routes configuration
const EXAMPLE = {
  IMPORTS: exampleImports,
  CONTROLLER_INSTANCE: controllerInstance,
  CONTROLLER_WITH_SOCKET: controllerWithSocketInstance,
  GET_ALL_ROUTE: getAllRoute,
  GET_BY_ID_ROUTE: getByIdRoute,
  CREATE_ROUTE: createRoute,
  CREATE_ROUTE_WITH_AUTH: createRouteWithAuth,
  UPDATE_ROUTE: updateRoute,
  DELETE_ROUTE: deleteRoute,
};

// Export configurations
export const ROUTES_CONFIG = Object.freeze({
  INDEX,
  EXAMPLE,
});
