/**
 * Project-level schemas
 */
import { z } from "zod";
import {
  EnvironmentSchema,
  FrameworkSchema,
  PortSchema,
  DatabaseOrmSchema,
  AuthLibSchema,
  WebsocketLibSchema,
  ViewEngineSchema,
  AccessModifierSchema,
  HttpMethodSchema,
} from "./base.js";

/**
 * Connection configuration schema
 */
export const ConnectionConfigSchema = z
  .object({
    host: z.string().default("localhost"),
    port: z.number().int().positive().default(5432),
    username: z.string().optional(),
    password: z.string().optional(),
    database: z.string(),
  })
  .strict();

/**
 * Middleware specification schema
 */
export const MiddlewareSpecSchema = z
  .object({
    helmet: z.boolean().default(true),
    cors: z.boolean().default(true),
    morgan: z.boolean().default(true),
    bodyParser: z.boolean().default(true),
    compression: z.boolean().default(false),
    rateLimit: z.boolean().default(false),
  })
  .strict();

/**
 * Extended middleware specification schema
 */
export const ExtendedMiddlewareSpecSchema = MiddlewareSpecSchema.extend({
  customMiddleware: z.array(z.string()).default([]),
}).strict();

/**
 * Database specification schema
 */
export const DatabaseSpecSchema = z
  .object({
    type: z.enum(["sql", "nosql"]),
    orm: DatabaseOrmSchema,
    name: z.string().min(1),
    connectionConfig: ConnectionConfigSchema,
  })
  .strict();

/**
 * SQL Database specification schema
 */
export const SqlDatabaseSpecSchema = DatabaseSpecSchema.extend({
  type: z.literal("sql"),
  dialect: z.enum(["postgres", "mysql", "sqlite", "mariadb", "mssql"]),
  migrations: z.boolean().default(true),
});

/**
 * NoSQL Database specification schema
 */
export const NoSqlDatabaseSpecSchema = DatabaseSpecSchema.extend({
  type: z.literal("nosql"),
  dialect: z.enum(["mongodb", "redis", "dynamodb"]),
});

/**
 * Authentication specification schema
 */
export const AuthSpecSchema = z
  .object({
    provider: AuthLibSchema,
    strategies: z.array(z.string()).default(["local"]),
    jwt: z.boolean().default(true),
    sessions: z.boolean().default(true),
  })
  .strict();

/**
 * WebSocket specification schema
 */
export const WebsocketSpecSchema = z
  .object({
    library: WebsocketLibSchema,
    namespaces: z.array(z.string()).default([]),
  })
  .strict();

/**
 * View specification schema
 */
export const ViewSpecSchema = z
  .object({
    engine: ViewEngineSchema,
    directory: z.string().default("views"),
  })
  .strict();

/**
 * Parameter specification schema
 */
export const ParameterSpecSchema = z
  .object({
    name: z.string().min(1),
    type: z.string().min(1),
    isOptional: z.boolean().default(false),
    defaultValue: z.unknown().optional(),
  })
  .strict();

/**
 * Server property specification schema
 */
export const ServerPropertySpecSchema = z
  .object({
    key: z.string().min(1),
    type: z.string().min(1),
    accessModifier: AccessModifierSchema.optional(),
    isOptional: z.boolean().default(false),
    hasDefiniteAssignment: z.boolean().default(false),
  })
  .strict();

/**
 * Server method specification schema
 */
export const ServerMethodSpecSchema = z
  .object({
    name: z.string().min(1),
    parameters: z.array(ParameterSpecSchema).default([]),
    returnType: z.string().optional(),
    isAsync: z.boolean().default(false),
    isStatic: z.boolean().default(false),
    accessModifier: AccessModifierSchema.optional(),
  })
  .strict();

/**
 * Route method specification schema
 */
export const RouteMethodSpecSchema = z
  .object({
    type: HttpMethodSchema,
    handler: z.string().min(1),
    middlewares: z.array(z.string()).default([]),
  })
  .strict();

/**
 * Route specification schema
 */
export const RouteSpecSchema = z
  .object({
    path: z.string().min(1),
    controller: z.string().min(1),
    methods: z.array(RouteMethodSpecSchema).default([]),
  })
  .strict();

/**
 * Base server specification schema
 */
export const ServerSpecSchema = z
  .object({
    framework: FrameworkSchema,
    port: PortSchema,
    middleware: MiddlewareSpecSchema,
    errorHandling: z.boolean().default(true),
    staticFiles: z.boolean().default(true),
    logging: z.boolean().default(true),
  })
  .strict();

/**
 * Express server specification schema
 */
export const ExpressServerSpecSchema = ServerSpecSchema.extend({
  host: z.string().default("localhost"),
  path: z.string().min(1),
  env: EnvironmentSchema,
  routes: z.array(RouteSpecSchema).default([]),
  properties: z.array(ServerPropertySpecSchema).default([]),
  methods: z.array(ServerMethodSpecSchema).default([]),
  middleware: ExtendedMiddlewareSpecSchema,
  webSockets: z.boolean().default(false),
  database: z.boolean().default(false),
  useDefaultRoutes: z.boolean().default(true),
});

/**
 * Project specification schema
 */
export const ProjectSpecSchema = z
  .object({
    name: z.string().min(1),
    path: z.string().min(1),
    server: ServerSpecSchema,
    database: DatabaseSpecSchema.optional(),
    authentication: AuthSpecSchema.optional(),
    websockets: WebsocketSpecSchema.optional(),
    views: ViewSpecSchema.optional(),
  })
  .strict();

/**
 * Project configuration schema
 */
export const ProjectConfigSchema = z
  .object({
    meta: z
      .object({
        name: z.string().min(1),
        version: z.string().min(1),
        generator: z.string().min(1),
      })
      .strict(),
    project: ProjectSpecSchema,
    plugins: z.array(z.record(z.string(), z.unknown())).default([]),
    output: z
      .object({
        format: z.enum(["typescript", "javascript"]).default("typescript"),
        target: z.string().default("es2020"),
        moduleResolution: z.enum(["node", "bundler"]).default("node"),
      })
      .strict(),
  })
  .strict();

/**
 * Type exports for inference
 */
export type ConnectionConfig = z.infer<typeof ConnectionConfigSchema>;
export type MiddlewareSpec = z.infer<typeof MiddlewareSpecSchema>;
export type ExtendedMiddlewareSpec = z.infer<
  typeof ExtendedMiddlewareSpecSchema
>;
export type DatabaseSpec = z.infer<typeof DatabaseSpecSchema>;
export type SqlDatabaseSpec = z.infer<typeof SqlDatabaseSpecSchema>;
export type NoSqlDatabaseSpec = z.infer<typeof NoSqlDatabaseSpecSchema>;
export type AuthSpec = z.infer<typeof AuthSpecSchema>;
export type WebsocketSpec = z.infer<typeof WebsocketSpecSchema>;
export type ViewSpec = z.infer<typeof ViewSpecSchema>;
export type ParameterSpec = z.infer<typeof ParameterSpecSchema>;
export type ServerPropertySpec = z.infer<typeof ServerPropertySpecSchema>;
export type ServerMethodSpec = z.infer<typeof ServerMethodSpecSchema>;
export type RouteMethodSpec = z.infer<typeof RouteMethodSpecSchema>;
export type RouteSpec = z.infer<typeof RouteSpecSchema>;
export type ServerSpec = z.infer<typeof ServerSpecSchema>;
export type ExpressServerSpec = z.infer<typeof ExpressServerSpecSchema>;
export type ProjectSpec = z.infer<typeof ProjectSpecSchema>;
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;
