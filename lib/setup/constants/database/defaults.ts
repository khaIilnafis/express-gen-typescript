/**
 * Database defaults constants
 * Contains default configuration values for different databases
 */

import { DatabaseDefaults } from "../../types/database/index.js";

/**
 * Default database connection configurations
 */
export const DEFAULTS = Object.freeze({
  MONGODB: {
    HOST: "localhost",
    PORT: "27017",
    DEFAULT_DB_NAME: "myapp",
    URI: (dbName: string) => `mongodb://localhost:27017/${dbName}`,
  },
  POSTGRES: {
    HOST: "localhost",
    PORT: "5432",
    DEFAULT_DB_NAME: "mydb",
    USER: "postgres",
    PASSWORD: "postgres",
    URI: (dbName: string) =>
      `postgresql://postgres:postgres@localhost:5432/${dbName}?schema=public`,
  },
  MYSQL: {
    HOST: "localhost",
    PORT: "3306",
    DEFAULT_DB_NAME: "mydb",
    USER: "root",
    PASSWORD: "",
  },
} as const) satisfies DatabaseDefaults;
