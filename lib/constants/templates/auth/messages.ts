/**
 * Authentication messages constants
 * Contains message strings related to authentication
 */

/**
 * Type definition for authentication error messages
 */
export interface AuthErrorMessages {
  INVALID_CREDENTIALS: string;
  TOKEN_EXPIRED: string;
  TOKEN_INVALID: string;
  TOKEN_MISSING: string;
  UNAUTHORIZED: string;
}

/**
 * Type definition for authentication success messages
 */
export interface AuthSuccessMessages {
  LOGIN_SUCCESS: string;
  LOGOUT_SUCCESS: string;
  TOKEN_REFRESH_SUCCESS: string;
}

/**
 * Type definition for authentication messages
 */
export interface AuthMessages {
  ERROR: AuthErrorMessages;
  SUCCESS: AuthSuccessMessages;
}

/**
 * Authentication message constants
 * Defines messages for authentication operations (login, logout, errors, etc.)
 */
export const MESSAGES = Object.freeze({
  ERROR: {
    INVALID_CREDENTIALS: "Invalid username or password.",
    TOKEN_EXPIRED: "Authentication token has expired.",
    TOKEN_INVALID: "Invalid authentication token.",
    TOKEN_MISSING: "No authentication token provided.",
    UNAUTHORIZED: "You are not authorized to access this resource.",
  },
  SUCCESS: {
    LOGIN_SUCCESS: "Successfully logged in.",
    LOGOUT_SUCCESS: "Successfully logged out.",
    TOKEN_REFRESH_SUCCESS: "Token successfully refreshed.",
  },
} as const) satisfies AuthMessages; 