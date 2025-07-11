import { GeneratorOptions } from "../../types/setup.js";
import {
  ServerSpecSchema,
  DatabaseSpecSchema,
  AuthSpecSchema,
  WebsocketSpecSchema,
  ViewSpecSchema,
  MiddlewareSpecSchema,
  ExpressServerSpecSchema,
  type ServerSpec,
  type DatabaseSpec,
  type AuthSpec,
  type WebsocketSpec,
  type ViewSpec,
  type MiddlewareSpec,
  type ExpressServerSpec,
  type ExtendedMiddlewareSpec,
} from "../../schemas/index.js";
import {
  DEFAULT_SERVER_METHODS,
  DEFAULT_SERVER_PROPERTIES,
} from "../server.js";
import { validateConfiguration } from "../../schemas/validation.js";

/**
 * Create a server specification from generator options
 */
export function createServerSpec(options: GeneratorOptions): ServerSpec {
  // Common middleware configuration
  let middleware: MiddlewareSpec;

  // Base server spec
  let serverSpec: ServerSpec;

  if (options.customSpec) {
    // This section will be replaced with the values for the custom spec defined elsewhere.
    middleware = {
      helmet: true,
      cors: true,
      morgan: true,
      bodyParser: true,
      compression: false,
      rateLimit: false,
    };
    serverSpec = {
      framework: "express",
      port: parseInt(process.env.PORT || "3000", 10),
      middleware,
      errorHandling: true,
      staticFiles: true,
      logging: true,
    };
  } else {
    middleware = {
      helmet: true,
      cors: true,
      morgan: true,
      bodyParser: true,
      compression: false,
      rateLimit: false,
    };
    serverSpec = {
      framework: "express",
      port: parseInt(process.env.PORT || "3000", 10),
      middleware,
      errorHandling: true,
      staticFiles: true,
      logging: true,
    };
  }

  // For now, we're only supporting Express, so always return ExpressServerSpec
  const expressSpec = createExpressServerSpec(options, serverSpec);

  // Validate the generated spec
  return validateConfiguration(
    ExpressServerSpecSchema,
    expressSpec,
    "Express server specification",
  );
}

/**
 * Create Express-specific server spec
 */
function createExpressServerSpec(
  options: GeneratorOptions,
  baseSpec: ServerSpec,
): ExpressServerSpec {
  // Create extended middleware spec
  const extendedMiddleware: ExtendedMiddlewareSpec = {
    ...baseSpec.middleware,
    customMiddleware: [],
  };

  // Base Express server spec
  const expressSpec: ExpressServerSpec = {
    ...baseSpec,
    framework: options.framework || "express",
    host: "localhost",
    path: "",
    useDefaultRoutes: Boolean(options.customSpec),
    env:
      (process.env.NODE_ENV as "development" | "production" | "test") ||
      "development",
    routes: Array.isArray(options.routes) ? options.routes : [],
    properties: DEFAULT_SERVER_PROPERTIES.map((prop) => ({
      ...prop,
      isOptional: prop.isOptional ?? false,
      hasDefiniteAssignment: prop.hasDefiniteAssignment ?? false,
    })),
    methods: DEFAULT_SERVER_METHODS.map((method) => ({
      ...method,
      isAsync: method.isAsync ?? false,
      isStatic: method.isStatic ?? false,
      parameters:
        method.parameters?.map((param) => ({
          ...param,
          isOptional: param.isOptional ?? false,
        })) ?? [],
    })),
    middleware: extendedMiddleware,
    webSockets: options.webSockets || false,
    database: options.database || false,
  };

  // Customize based on options
  if (options.webSockets) {
    expressSpec.properties.push({
      key: "io",
      type: "SocketIOServer",
      accessModifier: "private",
      isOptional: true,
      hasDefiniteAssignment: false,
    });

    expressSpec.methods.push({
      name: "initializeWebSockets",
      parameters: [],
      returnType: "void",
      isAsync: false,
      isStatic: false,
    });
  }

  if (options.database) {
    expressSpec.methods.push({
      name: "connectToDatabase",
      parameters: [],
      returnType: "Promise<void>",
      isAsync: true,
      isStatic: true,
    });
  }

  // Add more customizations based on options

  return expressSpec;
}

/**
 * Create a database specification from generator options
 */
export function createDatabaseSpec(options: GeneratorOptions): DatabaseSpec {
  const databaseSpec = {
    type: "sql" as const,
    orm: options.databaseOrm || "sequelize",
    name: options.databaseName || options.projectName,
    connectionConfig: {
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: options.databaseName || options.projectName,
    },
  };

  // Validate the generated spec
  return validateConfiguration(
    DatabaseSpecSchema,
    databaseSpec,
    "Database specification",
  );
}

/**
 * Create an authentication specification from generator options
 */
export function createAuthSpec(options: GeneratorOptions): AuthSpec {
  const authSpec = {
    provider: options.authLib || "passport",
    strategies: ["local"],
    jwt: true,
    sessions: true,
  };

  // Validate the generated spec
  return validateConfiguration(
    AuthSpecSchema,
    authSpec,
    "Authentication specification",
  );
}

/**
 * Create a websocket specification from generator options
 */
export function createWebsocketSpec(options: GeneratorOptions): WebsocketSpec {
  const websocketSpec = {
    library: options.websocketLib || "socket.io",
    namespaces: [],
  };

  // Validate the generated spec
  return validateConfiguration(
    WebsocketSpecSchema,
    websocketSpec,
    "WebSocket specification",
  );
}

/**
 * Create a view specification from generator options
 */
export function createViewSpec(options: GeneratorOptions): ViewSpec {
  const viewSpec = {
    engine: options.viewEngine || "ejs",
    directory: "views",
  };

  // Validate the generated spec
  return validateConfiguration(ViewSpecSchema, viewSpec, "View specification");
}
