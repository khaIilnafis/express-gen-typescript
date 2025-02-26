/**
 * Error-related constants
 */

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
}); 