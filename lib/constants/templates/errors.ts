/**
 * Error-related constants
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
interface SERVER_ERROR{
	STARTUP_FAILED: string;
	PORT_IN_USE: string;
	CONFIGURATION_ERROR: string;
	SHUTDOWN_ERROR: string;
}
interface ERROR_VALIDATION{
	REQUIRED_FIELD: (field: string) => string;
	INVALID_FORMAT: (field: string) => string;
	MIN_LENGTH: (field: string, length: number) => string;
	MAX_LENGTH: (field: string, length: number) => string;
}
export interface Errors {
	STATUS: ERROR_STATUS;
	MESSAGES: ERROR_MESSAGE;
}
export const ERRORS = Object.freeze({
  // HTTP status codes
  STATUS: Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  }),

  // Error messages by category
  MESSAGES: Object.freeze({
    DATABASE: Object.freeze({
      CONNECTION_FAILED: "Database connection failed",
      QUERY_FAILED: "Database query failed",
      RECORD_NOT_FOUND: "Record not found",
      DUPLICATE_ENTRY: "Duplicate entry",
      VALIDATION_FAILED: "Validation failed",
    }),

    AUTH: Object.freeze({
      INVALID_CREDENTIALS: "Invalid credentials",
      TOKEN_EXPIRED: "Token expired",
      TOKEN_INVALID: "Invalid token",
      ACCESS_DENIED: "Access denied",
      UNAUTHORIZED: "Unauthorized access",
    }),

    SERVER: Object.freeze({
      STARTUP_FAILED: "Server startup failed",
      PORT_IN_USE: "Port already in use",
      CONFIGURATION_ERROR: "Server configuration error",
      SHUTDOWN_ERROR: "Error during server shutdown",
    }),

    VALIDATION: Object.freeze({
      REQUIRED_FIELD: (field: string) => `${field} is required`,
      INVALID_FORMAT: (field: string) => `Invalid format for ${field}`,
      MIN_LENGTH: (field: string, length: number) =>
        `${field} must be at least ${length} characters`,
      MAX_LENGTH: (field: string, length: number) =>
        `${field} cannot exceed ${length} characters`,
    }),
  }),
}as const) satisfies Errors; 