import { AuthErrorLogs, AuthLogs, AuthSuccessLogs } from "./auth.js";
import { DatabaseConnectionLogs, DatabaseLogs } from "./database.js";
import { ErrorLogs, SetupLogs, SuccessLogs } from "./setup.js";
import {
  WebSocketConfigLogs,
  WebSocketErrorLogs,
  WebSocketLibraryLogs,
  WebSocketLogs,
  WebSocketStatusLogs,
} from "./sockets.js";

/**
 * Type definition for application logs
 */
interface ApplicationLogs {
  SETUP: SetupLogs;
  AUTH: AuthLogs;
  SOCKETS: WebSocketLogs;
  DATABASE: DatabaseLogs;
}

export {
  ApplicationLogs,
  AuthErrorLogs,
  AuthLogs,
  AuthSuccessLogs,
  DatabaseConnectionLogs,
  DatabaseLogs,
  ErrorLogs,
  SetupLogs,
  SuccessLogs,
  WebSocketConfigLogs,
  WebSocketErrorLogs,
  WebSocketLibraryLogs,
  WebSocketLogs,
  WebSocketStatusLogs,
};
