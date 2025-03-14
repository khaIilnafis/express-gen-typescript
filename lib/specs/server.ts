import { ServerSpec, MiddlewareSpec } from "./types.js";

/**
 * Extended server specification with more details
 */
export interface ExpressServerSpec extends ServerSpec {
  framework: "express";
  host: string;
  path: string; // Path to output directory
  env: "development" | "production" | "test";
  routes: RouteSpec[];
  properties: ServerPropertySpec[];
  methods: ServerMethodSpec[];
  middleware: ExtendedMiddlewareSpec;
  webSockets?: boolean; // Flag indicating if websockets are enabled
  database?: boolean; // Flag indicating if database is enabled
}

/**
 * Extended middleware specification with more details
 */
export interface ExtendedMiddlewareSpec extends MiddlewareSpec {
  customMiddleware?: string[];
}

/**
 * Specification for server properties
 */
export interface ServerPropertySpec {
  key: string;
  type: string;
  accessModifier?: "private" | "public" | "protected";
  isOptional?: boolean;
  hasDefiniteAssignment?: boolean;
}

/**
 * Specification for server methods
 */
export interface ServerMethodSpec {
  name: string;
  parameters: ParameterSpec[];
  returnType?: string;
  isAsync?: boolean;
  isStatic?: boolean;
  accessModifier?: "private" | "public" | "protected";
}

/**
 * Specification for method parameters
 */
export interface ParameterSpec {
  name: string;
  type: string;
  isOptional?: boolean;
  defaultValue?: unknown;
}

/**
 * Specification for routes
 */
export interface RouteSpec {
  path: string;
  controller: string;
  methods: RouteMethodSpec[];
}

/**
 * Specification for route methods
 */
export interface RouteMethodSpec {
  type: "get" | "post" | "put" | "delete" | "patch";
  handler: string;
  middlewares?: string[];
}

/**
 * Default server properties
 */
export const DEFAULT_SERVER_PROPERTIES: ServerPropertySpec[] = [
  {
    key: "app",
    type: "Application",
    accessModifier: "public",
  },
  {
    key: "server",
    type: "http.Server",
    accessModifier: "public",
  },
  {
    key: "port",
    type: "number | string",
    accessModifier: "public",
  },
];

/**
 * Default server methods
 */
export const DEFAULT_SERVER_METHODS: ServerMethodSpec[] = [
  {
    name: "bootstrap",
    parameters: [],
    isStatic: true,
    returnType: "void",
  },
  {
    name: "listen",
    parameters: [
      {
        name: "port",
        type: "number | string",
      },
    ],
    returnType: "void",
  },
  {
    name: "initializeMiddlewares",
    parameters: [],
    returnType: "void",
  },
  {
    name: "initializeRoutes",
    parameters: [],
    returnType: "void",
  },
  {
    name: "initializeErrorHandling",
    parameters: [],
    returnType: "void",
  },
];
