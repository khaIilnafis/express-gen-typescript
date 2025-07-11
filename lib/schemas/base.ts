/**
 * Base schemas for common types and utilities
 */
import { z } from "zod";

/**
 * Environment schema
 */
export const EnvironmentSchema = z
  .enum(["development", "production", "test"])
  .default("development");

/**
 * Framework schema
 */
export const FrameworkSchema = z.enum(["express", "koa", "hapi", "fastify"]);

/**
 * Port schema - accepts number or string
 */
export const PortSchema = z.union([
  z.number().int().positive().max(65535),
  z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10)),
]);

/**
 * Database ORM schema
 */
export const DatabaseOrmSchema = z.enum([
  "sequelize",
  "typeorm",
  "prisma",
  "mongoose",
]);

/**
 * Database dialect schema
 */
export const DatabaseDialectSchema = z.enum([
  "postgres",
  "mysql",
  "sqlite",
  "mariadb",
  "mssql",
  "mongodb",
]);

/**
 * Authentication library schema
 */
export const AuthLibSchema = z.enum(["passport", "jwt", "express-session"]);

/**
 * WebSocket library schema
 */
export const WebsocketLibSchema = z.enum(["socket.io", "ws", "none"]);

/**
 * View engine schema
 */
export const ViewEngineSchema = z.enum(["ejs", "pug", "handlebars", "none"]);

/**
 * Access modifier schema
 */
export const AccessModifierSchema = z.enum(["private", "public", "protected"]);

/**
 * HTTP method schema
 */
export const HttpMethodSchema = z.enum([
  "get",
  "post",
  "put",
  "delete",
  "patch",
  "head",
  "options",
]);

/**
 * Utility type for inferring types from schemas
 */
export type Environment = z.infer<typeof EnvironmentSchema>;
export type Framework = z.infer<typeof FrameworkSchema>;
export type Port = z.infer<typeof PortSchema>;
export type DatabaseOrm = z.infer<typeof DatabaseOrmSchema>;
export type DatabaseDialect = z.infer<typeof DatabaseDialectSchema>;
export type AuthLib = z.infer<typeof AuthLibSchema>;
export type WebsocketLib = z.infer<typeof WebsocketLibSchema>;
export type ViewEngine = z.infer<typeof ViewEngineSchema>;
export type AccessModifier = z.infer<typeof AccessModifierSchema>;
export type HttpMethod = z.infer<typeof HttpMethodSchema>;
