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
