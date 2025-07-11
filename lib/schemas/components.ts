/**
 * Component-level schemas for individual generators
 */
import { z } from "zod";
import {
  DatabaseOrmSchema,
  DatabaseDialectSchema,
  ViewEngineSchema,
  AccessModifierSchema,
  HttpMethodSchema,
} from "./base.js";
import { ParameterSpecSchema } from "./project.js";

/**
 * Controller method specification schema
 */
export const ControllerMethodSpecSchema = z
  .object({
    name: z.string().min(1),
    httpMethod: HttpMethodSchema,
    path: z.string().min(1),
    parameters: z.array(ParameterSpecSchema).default([]),
    returnType: z.string().default("Promise<void>"),
    middlewares: z.array(z.string()).default([]),
    validation: z
      .object({
        body: z.record(z.string(), z.unknown()).optional(),
        params: z.record(z.string(), z.unknown()).optional(),
        query: z.record(z.string(), z.unknown()).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

/**
 * Controller specification schema
 */
export const ControllerSpecSchema = z
  .object({
    name: z.string().min(1),
    basePath: z.string().default(""),
    methods: z.array(ControllerMethodSpecSchema).default([]),
    middlewares: z.array(z.string()).default([]),
    imports: z.array(z.string()).default([]),
    dependencies: z.array(z.string()).default([]),
  })
  .strict();

/**
 * Model field specification schema
 */
export const ModelFieldSpecSchema = z
  .object({
    name: z.string().min(1),
    type: z.string().min(1),
    required: z.boolean().default(true),
    unique: z.boolean().default(false),
    primaryKey: z.boolean().default(false),
    autoIncrement: z.boolean().default(false),
    defaultValue: z.unknown().optional(),
    validation: z
      .object({
        min: z.number().optional(),
        max: z.number().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        pattern: z.string().optional(),
        enum: z.array(z.string()).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

/**
 * Model relationship specification schema
 */
export const ModelRelationshipSpecSchema = z
  .object({
    type: z.enum(["hasOne", "hasMany", "belongsTo", "belongsToMany"]),
    target: z.string().min(1),
    foreignKey: z.string().optional(),
    through: z.string().optional(),
  })
  .strict();

/**
 * Model specification schema
 */
export const ModelSpecSchema = z
  .object({
    name: z.string().min(1),
    tableName: z.string().optional(),
    fields: z.array(ModelFieldSpecSchema).min(1),
    relationships: z.array(ModelRelationshipSpecSchema).default([]),
    indexes: z
      .array(
        z.object({
          name: z.string().min(1),
          fields: z.array(z.string()).min(1),
          unique: z.boolean().default(false),
        }),
      )
      .default([]),
    orm: DatabaseOrmSchema,
    timestamps: z.boolean().default(true),
  })
  .strict();

/**
 * Service method specification schema
 */
export const ServiceMethodSpecSchema = z
  .object({
    name: z.string().min(1),
    parameters: z.array(ParameterSpecSchema).default([]),
    returnType: z.string().default("Promise<void>"),
    isAsync: z.boolean().default(true),
    isStatic: z.boolean().default(false),
    accessModifier: AccessModifierSchema.default("public"),
  })
  .strict();

/**
 * Service specification schema
 */
export const ServiceSpecSchema = z
  .object({
    name: z.string().min(1),
    methods: z.array(ServiceMethodSpecSchema).default([]),
    dependencies: z.array(z.string()).default([]),
    imports: z.array(z.string()).default([]),
  })
  .strict();

/**
 * Individual middleware specification schema
 */
export const SingleMiddlewareSpecSchema = z
  .object({
    name: z.string().min(1),
    type: z.enum(["application", "route", "error"]),
    parameters: z.array(ParameterSpecSchema).default([]),
    dependencies: z.array(z.string()).default([]),
    imports: z.array(z.string()).default([]),
  })
  .strict();

/**
 * Individual route specification schema
 */
export const SingleRouteSpecSchema = z
  .object({
    path: z.string().min(1),
    method: HttpMethodSchema,
    controller: z.string().min(1),
    action: z.string().min(1),
    middlewares: z.array(z.string()).default([]),
    validation: z
      .object({
        body: z.record(z.string(), z.unknown()).optional(),
        params: z.record(z.string(), z.unknown()).optional(),
        query: z.record(z.string(), z.unknown()).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

/**
 * Database connection specification schema
 */
export const DatabaseConnectionSpecSchema = z
  .object({
    orm: DatabaseOrmSchema,
    dialect: DatabaseDialectSchema,
    host: z.string().default("localhost"),
    port: z.number().int().positive(),
    database: z.string().min(1),
    username: z.string().optional(),
    password: z.string().optional(),
    options: z.record(z.string(), z.unknown()).default({}),
  })
  .strict();

/**
 * WebSocket event specification schema
 */
export const WebSocketEventSpecSchema = z
  .object({
    name: z.string().min(1),
    handler: z.string().min(1),
    parameters: z.array(ParameterSpecSchema).default([]),
    validation: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

/**
 * WebSocket namespace specification schema
 */
export const WebSocketNamespaceSpecSchema = z
  .object({
    name: z.string().min(1),
    path: z.string().min(1),
    events: z.array(WebSocketEventSpecSchema).default([]),
    middlewares: z.array(z.string()).default([]),
  })
  .strict();

/**
 * View template specification schema
 */
export const ViewTemplateSpecSchema = z
  .object({
    name: z.string().min(1),
    engine: ViewEngineSchema,
    path: z.string().min(1),
    data: z.record(z.string(), z.unknown()).default({}),
    partials: z.array(z.string()).default([]),
    layouts: z.array(z.string()).default([]),
  })
  .strict();

/**
 * Type exports for inference
 */
export type ControllerMethodSpec = z.infer<typeof ControllerMethodSpecSchema>;
export type ControllerSpec = z.infer<typeof ControllerSpecSchema>;
export type ModelFieldSpec = z.infer<typeof ModelFieldSpecSchema>;
export type ModelRelationshipSpec = z.infer<typeof ModelRelationshipSpecSchema>;
export type ModelSpec = z.infer<typeof ModelSpecSchema>;
export type ServiceMethodSpec = z.infer<typeof ServiceMethodSpecSchema>;
export type ServiceSpec = z.infer<typeof ServiceSpecSchema>;
export type SingleMiddlewareSpec = z.infer<typeof SingleMiddlewareSpecSchema>;
export type SingleRouteSpec = z.infer<typeof SingleRouteSpecSchema>;
export type DatabaseConnectionSpec = z.infer<
  typeof DatabaseConnectionSpecSchema
>;
export type WebSocketEventSpec = z.infer<typeof WebSocketEventSpecSchema>;
export type WebSocketNamespaceSpec = z.infer<
  typeof WebSocketNamespaceSpecSchema
>;
export type ViewTemplateSpec = z.infer<typeof ViewTemplateSpecSchema>;
