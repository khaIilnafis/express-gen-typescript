/**
 * Type definition for database synchronization settings
 */
export interface DatabaseSynchronizeConfig {
  DEV: boolean;
  PROD: boolean;
}

/**
 * Type definition for database configuration
 */
export interface DatabaseConfig {
  DEFAULT_TYPE: string;
  SYNCHRONIZE: DatabaseSynchronizeConfig;
}
