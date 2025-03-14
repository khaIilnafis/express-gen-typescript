import { GeneratorOptions } from "../types/setup.js";
import {
  ProjectSpec,
  ServerSpec,
  DatabaseSpec,
  AuthSpec,
  WebsocketSpec,
  ViewSpec,
  MiddlewareSpec,
} from "./types.js";
import {
  ExpressServerSpec,
  DEFAULT_SERVER_METHODS,
  DEFAULT_SERVER_PROPERTIES,
  ExtendedMiddlewareSpec,
} from "./server.js";

/**
 * Create a project specification from generator options
 */
export function createProjectSpec(options: GeneratorOptions): ProjectSpec {
  const projectSpec: ProjectSpec = {
    name: options.projectName,
    path: options.destination,
    server: createServerSpec(options),
  };

  // Add optional components based on user selections
  if (options.database) {
    projectSpec.database = createDatabaseSpec(options);
  }

  if (options.authentication) {
    projectSpec.authentication = createAuthSpec(options);
  }

  if (options.webSockets) {
    projectSpec.websockets = createWebsocketSpec(options);
  }

  if (options.view) {
    projectSpec.views = createViewSpec(options);
  }

  return projectSpec;
}

/**
 * Create a server specification from generator options
 */
function createServerSpec(options: GeneratorOptions): ServerSpec {
  // Common middleware configuration
  const middleware: MiddlewareSpec = {
    helmet: true,
    cors: true,
    morgan: true,
    bodyParser: true,
    compression: false,
    rateLimit: false,
  };

  // Base server spec
  const serverSpec: ServerSpec = {
    port: process.env.PORT || 3000,
    middleware,
    errorHandling: true,
    staticFiles: true,
    logging: true,
  };

  // For now, we're only supporting Express, so always return ExpressServerSpec
  return createExpressServerSpec(options, serverSpec);
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
    framework: "express",
    host: "localhost",
    path: "",
    env:
      (process.env.NODE_ENV as "development" | "production" | "test") ||
      "development",
    routes: [],
    properties: [...DEFAULT_SERVER_PROPERTIES],
    methods: [...DEFAULT_SERVER_METHODS],
    middleware: extendedMiddleware,
  };

  // Customize based on options
  if (options.webSockets) {
    expressSpec.properties.push({
      key: "io",
      type: "SocketIOServer",
      accessModifier: "private",
      isOptional: true,
    });

    expressSpec.methods.push({
      name: "initializeWebSockets",
      parameters: [],
      returnType: "void",
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
function createDatabaseSpec(options: GeneratorOptions): DatabaseSpec {
  // Placeholder implementation
  return {
    type: "sql",
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
}

/**
 * Create an authentication specification from generator options
 */
function createAuthSpec(options: GeneratorOptions): AuthSpec {
  // Placeholder implementation
  return {
    provider: options.authLib || "passport",
    strategies: ["local"],
    jwt: true,
    sessions: true,
  };
}

/**
 * Create a websocket specification from generator options
 */
function createWebsocketSpec(options: GeneratorOptions): WebsocketSpec {
  // Placeholder implementation
  return {
    library: options.websocketLib || "socket.io",
    namespaces: [],
  };
}

/**
 * Create a view specification from generator options
 */
function createViewSpec(options: GeneratorOptions): ViewSpec {
  // Placeholder implementation
  return {
    engine: options.viewEngine || "ejs",
    directory: "views",
  };
}
