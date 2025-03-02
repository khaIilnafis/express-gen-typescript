/**
 * Type definition for setup logs
 */
export interface SetupLogs {
  PROJECT_STRUCTURE: string;
  DATABASE: (db: string) => string;
  WEBSOCKETS: (lib: string) => string;
  VIEW_ENGINE: (engine: string) => string;
  ENV_FILE: string;
  SUCCESS: SuccessLogs;
  ERROR: ErrorLogs;
}
/**
 * Type definition for success logs
 */
export interface SuccessLogs {
  README: string;
  PROJECT: string;
}

/**
 * Type definition for error logs
 */
export interface ErrorLogs {
  GENERAL: string;
}
