/**
 * Application log constants
 * Contains log strings used throughout the application
 */

import { SetupLogs, SETUP_LOGS } from "./setup.js";
import { AuthLogs, AUTH_LOGS } from "./auth.js";
import { WebSocketLogs, SOCKET_LOGS } from "./sockets.js";
import { DatabaseLogs, DATABASE_LOGS } from "./database.js";
 
/**
 * Type definition for application logs
 */
export interface ApplicationLogs {
  SETUP: SetupLogs;
  AUTH: AuthLogs;
  SOCKETS: WebSocketLogs;
  DATABASE: DatabaseLogs
}

/**
 * Application log constants
 */
export const LOGS = Object.freeze({
  SETUP: SETUP_LOGS,
  AUTH: AUTH_LOGS,
  DATABASE: DATABASE_LOGS,
  SOCKETS:SOCKET_LOGS
} as const) satisfies ApplicationLogs; 