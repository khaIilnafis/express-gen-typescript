/**
 * Error-related types
 */
interface ERROR_STATUS {
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  CONFLICT: number;
  SERVER_ERROR: number;
}
interface ERROR_MESSAGE {
  DATABASE: DATABASE_ERROR;
  AUTH: AUTH_ERROR;
  SERVER: SERVER_ERROR;
  VALIDATION: ERROR_VALIDATION;
}
interface DATABASE_ERROR {
  CONNECTION_FAILED: string;
  QUERY_FAILED: string;
  RECORD_NOT_FOUND: string;
  DUPLICATE_ENTRY: string;
  VALIDATION_FAILED: string;
}
interface AUTH_ERROR {
  INVALID_CREDENTIALS: string;
  TOKEN_EXPIRED: string;
  TOKEN_INVALID: string;
  ACCESS_DENIED: string;
  UNAUTHORIZED: string;
}
interface SERVER_ERROR {
  STARTUP_FAILED: string;
  PORT_IN_USE: string;
  CONFIGURATION_ERROR: string;
  SHUTDOWN_ERROR: string;
}
interface ERROR_VALIDATION {
  REQUIRED_FIELD: (field: string) => string;
  INVALID_FORMAT: (field: string) => string;
  MIN_LENGTH: (field: string, length: number) => string;
  MAX_LENGTH: (field: string, length: number) => string;
}
export interface Errors {
  STATUS: ERROR_STATUS;
  MESSAGES: ERROR_MESSAGE;
}
