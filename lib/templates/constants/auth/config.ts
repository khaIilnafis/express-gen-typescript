import { AuthConfig } from "../../types/auth/index.js";

/**
 * Authentication configuration constants
 * Defines configuration settings for authentication
 */
export const CONFIG = Object.freeze({
  JWT: {
    SECRET_LENGTH: 64,
    EXPIRATION: {
      ACCESS: 15, // 15 minutes
      REFRESH: "7d", // 7 days
    },
  },
} as const) satisfies AuthConfig;
