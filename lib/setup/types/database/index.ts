import { DatabaseConfig, DatabaseSynchronizeConfig } from "./config.js";
import {
  DatabaseDefaults,
  MongoDBDefaults,
  MySQLDefaults,
  PostgresDefaults,
} from "./defaults.js";
import { DatabaseDialects } from "./dialects.js";
import { DatabaseTypes } from "./types.js";

/**
 * Type definition for database structure
 */
interface DatabaseStructure {
  TYPES: DatabaseTypes;
  DIALECTS: DatabaseDialects;
  DEFAULTS: DatabaseDefaults;
  CONFIG: DatabaseConfig;
}

export {
  DatabaseStructure,
  DatabaseConfig,
  DatabaseSynchronizeConfig,
  DatabaseDefaults,
  MongoDBDefaults,
  MySQLDefaults,
  PostgresDefaults,
  DatabaseDialects,
  DatabaseTypes,
};
