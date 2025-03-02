/**
 * Database types constant
 * Contains constants related to database types and ORM/ODM options
 */

import { DatabaseTypes } from "../../types/database/index.js";

export const TYPES = Object.freeze({
  NONE: "none",
  SEQUELIZE: "sequelize",
  TYPEORM: "typeorm",
  PRISMA: "prisma",
  MONGOOSE: "mongoose",
} as const) satisfies DatabaseTypes;
