import { ExpressServerSpec } from "../specs/server.js";
import {
  ProjectSpec,
  DatabaseSpec as DatabaseSpecType,
  AuthSpec as AuthSpecType,
  WebsocketSpec as WebsocketSpecType,
  ViewSpec as ViewSpecType,
} from "../specs/types.js";
import {
  ImportsIR,
  MethodDefinitionIR,
  ConstructorDefinitionIR,
  PropertyIR,
  MethodExpressionIR,
} from "../types/index.js";

/**
 * Interface for server preset
 */
export interface ServerPreset {
  // Import declarations for server files
  imports: ImportsIR;

  // Constructor definition for server class
  constructor: ConstructorDefinitionIR;

  // Method definitions for server class
  methods: {
    initializeMiddlewares: MethodDefinitionIR;
    initializeRoutes: MethodDefinitionIR;
    initializeErrorHandling: MethodDefinitionIR;
    listen: MethodDefinitionIR;
    bootstrap: MethodDefinitionIR;
    connectToDatabase?: MethodDefinitionIR;
    initializeWebSockets?: MethodDefinitionIR;
    [key: string]: MethodDefinitionIR | undefined;
  };

  // Property definitions for server class
  properties: PropertyIR[];
}

/**
 * Interface for database preset
 */
export interface DatabasePreset {
  imports: ImportsIR;
  connectionConfig: unknown;
  models: unknown[];
  methods: {
    connect: MethodDefinitionIR;
    disconnect: MethodDefinitionIR;
    [key: string]: MethodDefinitionIR | undefined;
  };
  migrations?: unknown;
}

/**
 * Interface for auth preset
 */
export interface AuthPreset {
  imports: ImportsIR;
  strategies: unknown[];
  middleware: unknown[];
  models: unknown[];
  methods: {
    [key: string]: MethodDefinitionIR | undefined;
  };
}

/**
 * Interface for websocket preset
 */
export interface WebsocketPreset {
  imports: ImportsIR;
  methods: {
    initialize: MethodDefinitionIR;
    [key: string]: MethodDefinitionIR | undefined;
  };
  handlers: unknown[];
}

/**
 * Interface for view preset
 */
export interface ViewPreset {
  imports: ImportsIR;
  viewEngine: string;
  viewsDir: string;
  methods: {
    render: MethodDefinitionIR;
    [key: string]: MethodDefinitionIR | undefined;
  };
}

/**
 * Interface for complete project preset
 */
export interface ProjectPreset {
  server: ServerPreset;
  database?: DatabasePreset;
  auth?: AuthPreset;
  websockets?: WebsocketPreset;
  views?: ViewPreset;
}

/**
 * Create server preset from server spec
 */
export function createServerPreset(spec: ExpressServerSpec): ServerPreset {
  // Start with base imports
  const imports: ImportsIR = {
    EXPRESS: {
      NAME: "express",
      DEFAULT: { EXPRESS: "express" },
      NAMED: { Application: "Application" },
    },
    HTTP: {
      NAME: "http",
      DEFAULT: { HTTP: "http" },
      NAMED: {},
    },
    PATH: {
      NAME: "path",
      DEFAULT: { PATH: "path" },
      NAMED: {},
    },
    ENV: {
      NAME: "dotenv/config",
      DEFAULT: {},
      NAMED: {},
    },
  };

  // Add middleware imports based on spec
  if (spec.middleware.helmet) {
    imports.HELMET = {
      NAME: "helmet",
      DEFAULT: { HELMET: "helmet" },
      NAMED: {},
    };
  }

  if (spec.middleware.cors) {
    imports.CORS = {
      NAME: "cors",
      DEFAULT: { CORS: "cors" },
      NAMED: {},
    };
  }

  if (spec.middleware.morgan) {
    imports.MORGAN = {
      NAME: "morgan",
      DEFAULT: { MORGAN: "morgan" },
      NAMED: {},
    };
  }

  // Add websocket imports if enabled
  if (spec.webSockets) {
    imports.SOCKETIO = {
      NAME: "socket.io",
      DEFAULT: {},
      NAMED: { Server: ["Server", "SocketIOServer"] },
    };
  }

  // Create constructor expressions based on spec
  const constructorExpressions: MethodExpressionIR[] = [
    {
      expressionType: "assignment",
      target: { object: "this", property: "app" },
      arguments: [{ type: "function_call", value: "express" }],
    },
    {
      expressionType: "assignment",
      target: { object: "this", property: "server" },
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
    },
    {
      expressionType: "assignment",
      target: { object: "this", property: "port" },
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
    },
  ];

  // Add middleware initialization
  constructorExpressions.push({
    expressionType: "method_call",
    target: { object: "this", property: "initializeMiddlewares" },
    arguments: [],
  });

  // Add websocket initialization if enabled
  if (spec.webSockets) {
    constructorExpressions.push({
      expressionType: "method_call",
      target: { object: "this", property: "initializeWebSockets" },
      arguments: [],
    });
  }

  // Add routes initialization
  constructorExpressions.push({
    expressionType: "method_call",
    target: { object: "this", property: "initializeRoutes" },
    arguments: [],
  });

  // Add error handling initialization
  constructorExpressions.push({
    expressionType: "method_call",
    target: { object: "this", property: "initializeErrorHandling" },
    arguments: [],
  });

  // Add database connection if enabled
  if (spec.database) {
    constructorExpressions.push({
      expressionType: "method_call",
      target: { object: "Server", property: "connectToDatabase" },
      arguments: [],
    });
  }

  // Create constructor definition
  const constructor: ConstructorDefinitionIR = {
    parameters: [],
    expressions: constructorExpressions,
  };

  // Initialize method definitions based on spec.methods
  const methods: ServerPreset["methods"] = {
    // Base methods that are always included
    initializeMiddlewares: createMiddlewareMethod(spec),
    initializeRoutes: createRoutesMethod(spec),
    initializeErrorHandling: createErrorHandlingMethod(spec),
    listen: createListenMethod(spec),
    bootstrap: createBootstrapMethod(spec),
  };

  // Add optional methods based on spec
  if (spec.database) {
    methods.connectToDatabase = createConnectToDatabaseMethod(spec);
  }

  if (spec.webSockets) {
    methods.initializeWebSockets = createWebSocketsMethod(spec);
  }

  // Return the complete server preset
  return {
    imports,
    constructor,
    methods,
    properties: convertSpecPropertiesToPresetProperties(spec.properties),
  };
}

/**
 * Create database preset from database spec
 */
export function createDatabasePreset(_spec: DatabaseSpecType): DatabasePreset {
  // This is a placeholder - in a real implementation, we would create a proper database preset
  // based on the database spec
  return {
    imports: {},
    connectionConfig: {},
    models: [],
    methods: {
      connect: {
        name: "connect",
        parameters: [],
        expressions: [],
        isAsync: true,
        returnType: "Promise<void>",
      },
      disconnect: {
        name: "disconnect",
        parameters: [],
        expressions: [],
        isAsync: true,
        returnType: "Promise<void>",
      },
    },
  };
}

/**
 * Create auth preset from auth spec
 */
export function createAuthPreset(_spec: AuthSpecType): AuthPreset {
  // This is a placeholder - in a real implementation, we would create a proper auth preset
  // based on the auth spec
  return {
    imports: {},
    strategies: [],
    middleware: [],
    models: [],
    methods: {},
  };
}

/**
 * Create websocket preset from websocket spec
 */
export function createWebsocketPreset(
  _spec: WebsocketSpecType,
): WebsocketPreset {
  // This is a placeholder - in a real implementation, we would create a proper websocket preset
  // based on the websocket spec
  return {
    imports: {},
    methods: {
      initialize: {
        name: "initializeWebSockets",
        parameters: [],
        expressions: [],
        returnType: "void",
      },
    },
    handlers: [],
  };
}

/**
 * Create view preset from view spec
 */
export function createViewPreset(_spec: ViewSpecType): ViewPreset {
  // This is a placeholder - in a real implementation, we would create a proper view preset
  // based on the view spec
  return {
    imports: {},
    viewEngine: "ejs",
    viewsDir: "views",
    methods: {
      render: {
        name: "render",
        parameters: [
          { name: "view", type: "string" },
          { name: "data", type: "Record<string, unknown>" },
        ],
        expressions: [],
        returnType: "void",
      },
    },
  };
}

/**
 * Create preset for the entire project based on project spec
 */
export function createProjectPreset(spec: ProjectSpec): ProjectPreset {
  // Start with empty preset
  const preset: ProjectPreset = {
    server: createServerPreset(spec.server as ExpressServerSpec),
  };

  // Add optional component presets based on project spec
  if (spec.database) {
    preset.database = createDatabasePreset(spec.database);
  }

  if (spec.authentication) {
    preset.auth = createAuthPreset(spec.authentication);
  }

  if (spec.websockets) {
    preset.websockets = createWebsocketPreset(spec.websockets);
  }

  if (spec.views) {
    preset.views = createViewPreset(spec.views);
  }

  return preset;
}

/**
 * Convert spec properties to preset properties
 */
function convertSpecPropertiesToPresetProperties(
  properties: ExpressServerSpec["properties"],
): PropertyIR[] {
  return properties.map((prop) => ({
    key: prop.key,
    type: prop.type,
    accessModifier: prop.accessModifier,
    isOptional: prop.isOptional,
    hasDefiniteAssignment: prop.hasDefiniteAssignment,
  }));
}

/**
 * Create middleware method definition
 */
function createMiddlewareMethod(spec: ExpressServerSpec): MethodDefinitionIR {
  const expressions: MethodExpressionIR[] = [];

  if (spec.middleware.helmet) {
    expressions.push({
      expressionType: "method_call",
      target: { object: "this.app", property: "use" },
      arguments: [{ type: "function_call", value: "helmet", arguments: [] }],
    });
  }

  if (spec.middleware.cors) {
    expressions.push({
      expressionType: "method_call",
      target: { object: "this.app", property: "use" },
      arguments: [{ type: "function_call", value: "cors", arguments: [] }],
    });
  }

  if (spec.middleware.morgan) {
    expressions.push({
      expressionType: "method_call",
      target: { object: "this.app", property: "use" },
      arguments: [
        {
          type: "function_call",
          value: "morgan",
          arguments: [{ type: "literal", value: "dev" }],
        },
      ],
    });
  }

  if (spec.middleware.bodyParser) {
    expressions.push({
      expressionType: "method_call",
      target: { object: "this.app", property: "use" },
      arguments: [
        { type: "function_call", value: "express.json", arguments: [] },
      ],
    });

    expressions.push({
      expressionType: "method_call",
      target: { object: "this.app", property: "use" },
      arguments: [
        {
          type: "function_call",
          value: "express.urlencoded",
          arguments: [
            {
              type: "object",
              properties: { extended: { type: "literal", value: true } },
            },
          ],
        },
      ],
    });
  }

  return {
    name: "initializeMiddlewares",
    parameters: [],
    expressions,
    returnType: "void",
  };
}

/**
 * Create routes method definition
 */
function createRoutesMethod(spec: ExpressServerSpec): MethodDefinitionIR {
  // Default route expressions
  const expressions: MethodExpressionIR[] = [
    // API routes
    {
      expressionType: "method_call",
      target: { object: "this.app", property: "use" },
      arguments: [
        { type: "literal", value: "/api" },
        {
          type: "function_call",
          functionExpression: {
            type: "arrow_function",
            parameters: [
              { name: "req", type: "Request" },
              { name: "res", type: "Response" },
            ],
            body: [
              {
                expressionType: "method_call",
                target: { object: "res", property: "send" },
                arguments: [{ type: "literal", value: "API is running" }],
              },
            ],
          },
        },
      ],
    },
    // Root route
    {
      expressionType: "method_call",
      target: { object: "this.app", property: "get" },
      arguments: [
        { type: "literal", value: "/" },
        {
          type: "function_call",
          functionExpression: {
            type: "arrow_function",
            parameters: [
              { name: "req", type: "Request" },
              { name: "res", type: "Response" },
            ],
            body: [
              {
                expressionType: "method_call",
                target: { object: "res", property: "send" },
                arguments: [
                  { type: "literal", value: "Express + TypeScript Server" },
                ],
              },
            ],
          },
        },
      ],
    },
  ];

  // Add custom routes from spec if available
  if (spec.routes && spec.routes.length > 0) {
    // Here we would add code to handle custom routes from the spec
  }

  return {
    name: "initializeRoutes",
    parameters: [],
    expressions,
    returnType: "void",
  };
}

/**
 * Create error handling method definition
 */
function createErrorHandlingMethod(
  _spec: ExpressServerSpec,
): MethodDefinitionIR {
  return {
    name: "initializeErrorHandling",
    parameters: [],
    expressions: [
      // 404 handler
      {
        expressionType: "method_call",
        target: { object: "this.app", property: "use" },
        arguments: [
          {
            type: "function_call",
            functionExpression: {
              type: "arrow_function",
              parameters: [
                { name: "req", type: "Request" },
                { name: "res", type: "Response" },
                { name: "next", type: "NextFunction" },
              ],
              body: [
                {
                  expressionType: "method_call",
                  target: { object: "res.status(404)", property: "json" },
                  arguments: [
                    {
                      type: "object",
                      properties: {
                        success: { type: "literal", value: false },
                        message: {
                          type: "template_literal",
                          quasis: [
                            { text: "Cannot ", isExpression: false },
                            { text: " ", isExpression: false },
                            { text: "", isExpression: false },
                          ],
                          expressions: [
                            {
                              type: "property_access",
                              target: "req",
                              property: "method",
                            },
                            {
                              type: "property_access",
                              target: "req",
                              property: "originalUrl",
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      // Global error handler
      {
        expressionType: "method_call",
        target: { object: "this.app", property: "use" },
        arguments: [
          {
            type: "function_call",
            functionExpression: {
              type: "arrow_function",
              parameters: [
                { name: "error", type: "any" },
                { name: "req", type: "Request" },
                { name: "res", type: "Response" },
                { name: "next", type: "NextFunction" },
              ],
              body: [
                {
                  expressionType: "method_call",
                  target: { object: "console", property: "error" },
                  arguments: [{ type: "identifier", value: "error" }],
                },
                {
                  expressionType: "variable_declaration",
                  target: { object: "", property: "" },
                  variableKind: "const",
                  arguments: [],
                  declarations: [
                    {
                      id: "statusCode",
                      init: {
                        type: "logical_expression",
                        operator: "||",
                        left: {
                          type: "property_access",
                          target: "error",
                          property: "statusCode",
                        },
                        right: { type: "literal", value: 500 },
                      },
                    },
                  ],
                },
                {
                  expressionType: "variable_declaration",
                  target: { object: "", property: "" },
                  variableKind: "const",
                  arguments: [],
                  declarations: [
                    {
                      id: "message",
                      init: {
                        type: "logical_expression",
                        operator: "||",
                        left: {
                          type: "property_access",
                          target: "error",
                          property: "message",
                        },
                        right: {
                          type: "literal",
                          value: "Internal Server Error",
                        },
                      },
                    },
                  ],
                },
                {
                  expressionType: "method_call",
                  target: {
                    object: "res.status(statusCode)",
                    property: "json",
                  },
                  arguments: [
                    {
                      type: "object",
                      properties: {
                        success: { type: "literal", value: false },
                        message: { type: "identifier", value: "message" },
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
    returnType: "void",
  };
}

/**
 * Create listen method definition
 */
function createListenMethod(_spec: ExpressServerSpec): MethodDefinitionIR {
  return {
    name: "listen",
    parameters: [],
    expressions: [
      {
        expressionType: "method_call",
        target: { object: "this.server", property: "listen" },
        arguments: [
          { type: "property_access", target: "this", property: "port" },
          {
            type: "function_call",
            functionExpression: {
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
                        {
                          text: "Server running at http://localhost:",
                          isExpression: false,
                        },
                        { text: "", isExpression: false },
                      ],
                      expressions: [
                        {
                          type: "property_access",
                          target: "this",
                          property: "port",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
    returnType: "void",
  };
}

/**
 * Create bootstrap method definition
 */
function createBootstrapMethod(_spec: ExpressServerSpec): MethodDefinitionIR {
  return {
    name: "bootstrap",
    parameters: [],
    isStatic: true,
    expressions: [
      {
        expressionType: "variable_declaration",
        target: { object: "", property: "" },
        variableKind: "const",
        arguments: [],
        declarations: [
          {
            id: "server",
            init: { type: "constructor_call", value: "Server", arguments: [] },
          },
        ],
      },
      {
        expressionType: "method_call",
        target: { object: "server", property: "listen" },
        arguments: [],
      },
    ],
    returnType: "void",
  };
}

/**
 * Create connect to database method definition
 */
function createConnectToDatabaseMethod(
  _spec: ExpressServerSpec,
): MethodDefinitionIR {
  return {
    name: "connectToDatabase",
    parameters: [],
    isStatic: true,
    isAsync: true,
    expressions: [
      {
        expressionType: "try_catch",
        target: { object: "", property: "" },
        arguments: [],
        tryCatchBlock: {
          tryBlock: [
            {
              expressionType: "method_call",
              target: { object: "console", property: "log" },
              arguments: [
                { type: "literal", value: "Connecting to database..." },
              ],
            },
            // Here we would add actual database connection code based on the database type
            {
              expressionType: "method_call",
              target: { object: "console", property: "log" },
              arguments: [
                { type: "literal", value: "Database connection established" },
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
            {
              expressionType: "throw",
              target: { object: "", property: "" },
              arguments: [{ type: "identifier", value: "error" }],
            },
          ],
        },
      },
    ],
    returnType: "Promise<void>",
  };
}

/**
 * Create WebSockets method definition
 */
function createWebSocketsMethod(_spec: ExpressServerSpec): MethodDefinitionIR {
  return {
    name: "initializeWebSockets",
    parameters: [],
    expressions: [
      {
        expressionType: "assignment",
        target: { object: "this", property: "io" },
        arguments: [
          {
            type: "constructor_call",
            value: "SocketIOServer",
            arguments: [
              { type: "property_access", target: "this", property: "server" },
              {
                type: "object",
                properties: {
                  cors: {
                    type: "object",
                    properties: {
                      origin: { type: "literal", value: "*" },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        expressionType: "method_call",
        target: { object: "this.io", property: "on" },
        arguments: [
          { type: "literal", value: "connection" },
          {
            type: "function_call",
            functionExpression: {
              type: "arrow_function",
              parameters: [{ name: "socket", type: "Socket" }],
              body: [
                {
                  expressionType: "method_call",
                  target: { object: "console", property: "log" },
                  arguments: [
                    {
                      type: "template_literal",
                      quasis: [
                        { text: "Client connected: ", isExpression: false },
                        { text: "", isExpression: false },
                      ],
                      expressions: [
                        {
                          type: "property_access",
                          target: "socket",
                          property: "id",
                        },
                      ],
                    },
                  ],
                },
                {
                  expressionType: "method_call",
                  target: { object: "socket", property: "on" },
                  arguments: [
                    { type: "literal", value: "disconnect" },
                    {
                      type: "function_call",
                      functionExpression: {
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
                                  {
                                    text: "Client disconnected: ",
                                    isExpression: false,
                                  },
                                  { text: "", isExpression: false },
                                ],
                                expressions: [
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
                },
              ],
            },
          },
        ],
      },
    ],
    returnType: "void",
  };
}

/**
 * Create preset for server generation
 * This is a placeholder - will be expanded later
 */
export function createPreset(spec: ExpressServerSpec): ServerPreset {
  return createServerPreset(spec);
}
