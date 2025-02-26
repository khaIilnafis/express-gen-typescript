/**
 * Database defaults constants
 * Contains default configuration values for different databases
 */

/**
 * Type definitions for MongoDB defaults
 */
export interface MongoDBDefaults {
  HOST: string;
  PORT: string;
  DEFAULT_DB_NAME: string;
  URI: (dbName: string) => string;
}

/**
 * Type definitions for PostgreSQL defaults
 */
export interface PostgresDefaults {
  HOST: string;
  PORT: string;
  DEFAULT_DB_NAME: string;
  USER: string;
  PASSWORD: string;
  URI: (dbName: string) => string;
}

/**
 * Type definitions for MySQL defaults
 */
export interface MySQLDefaults {
  HOST: string;
  PORT: string;
  DEFAULT_DB_NAME: string;
  USER: string;
  PASSWORD: string;
}

/**
 * Type definition for database defaults
 */
export interface DatabaseDefaults {
  MONGODB: MongoDBDefaults;
  POSTGRES: PostgresDefaults;
  MYSQL: MySQLDefaults;
}

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