/**
 * Authentication messages constants
 * Contains message strings related to authentication
 */

import { AuthMessages } from "../../types/auth/index.js";

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
