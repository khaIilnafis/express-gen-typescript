/**
 * Application log constants
 * Contains log strings used throughout the application
 */

import { SETUP_LOGS } from "./setup.js";
import { AUTH_LOGS } from "./auth.js";
import { SOCKET_LOGS } from "./sockets.js";
import { DATABASE_LOGS } from "./database.js";
import { ApplicationLogs } from "../../types/logs/index.js";

/**
 * Application log constants
 */
export const LOGS = Object.freeze({
  SETUP: SETUP_LOGS,
  AUTH: AUTH_LOGS,
  DATABASE: DATABASE_LOGS,
  SOCKETS: SOCKET_LOGS,
} as const) satisfies ApplicationLogs;
