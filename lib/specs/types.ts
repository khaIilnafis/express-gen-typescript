/**
 * Base specification type for the entire project
 */
export interface ProjectSpec {
  name: string;
  path: string;
  server: ServerSpec;
  database?: DatabaseSpec;
  authentication?: AuthSpec;
  websockets?: WebsocketSpec;
  views?: ViewSpec;
}

/**
 * Base specification for server component
 */
export interface ServerSpec {
  port: number | string;
  middleware: MiddlewareSpec;
  errorHandling: boolean;
  staticFiles: boolean;
  logging: boolean;
}

/**
 * Specification for middleware
 */
export interface MiddlewareSpec {
  helmet: boolean;
  cors: boolean;
  morgan: boolean;
  bodyParser: boolean;
  compression: boolean;
  rateLimit: boolean;
}

/**
 * Base specification for database component
 */
export interface DatabaseSpec {
  type: string;
  orm: string;
  name: string;
  connectionConfig: ConnectionConfig;
}

/**
 * Database connection configuration
 */
export interface ConnectionConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  database: string;
}

/**
 * Specification for SQL databases
 */
export interface SqlDatabaseSpec extends DatabaseSpec {
  type: "sql";
  dialect: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  migrations: boolean;
}

/**
 * Specification for NoSQL databases
 */
export interface NoSqlDatabaseSpec extends DatabaseSpec {
  type: "nosql";
  dialect: "mongodb" | "redis" | "dynamodb";
}

/**
 * Specification for authentication
 */
export interface AuthSpec {
  provider: string;
  strategies: string[];
  jwt: boolean;
  sessions: boolean;
}

/**
 * Specification for websockets
 */
export interface WebsocketSpec {
  library: string;
  namespaces: string[];
}

/**
 * Specification for views
 */
export interface ViewSpec {
  engine: string;
  directory: string;
}
