/**
 * Database types constants
 * Contains constants related to database types and ORM/ODM options
 */

/**
 * Type definition for database types
 */
export interface DatabaseTypes {
  NONE: string;
  SEQUELIZE: string;
  TYPEORM: string;
  PRISMA: string;
  MONGOOSE: string;
}

/**
 * Database type constants
 * Defines all supported database types/ORMs
 */
export const TYPES = Object.freeze({
  NONE: "none",
  SEQUELIZE: "sequelize",
  TYPEORM: "typeorm",
  PRISMA: "prisma",
  MONGOOSE: "mongoose",
} as const) satisfies DatabaseTypes; 