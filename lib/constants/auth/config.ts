/**
 * Authentication configuration constants
 * Contains configuration settings for authentication methods
 */

/**
 * Type definition for JWT configuration
 */
export interface JwtConfig {
  SECRET_LENGTH: number;
  EXPIRATION: {
    ACCESS: string;
    REFRESH: string;
  };
}

/**
 * Type definition for auth configuration
 */
export interface AuthConfig {
  JWT: JwtConfig;
}

/**
 * Authentication configuration constants
 * Defines configuration settings for authentication
 */
export const CONFIG = Object.freeze({
  JWT: {
    SECRET_LENGTH: 64,
    EXPIRATION: {
      ACCESS: "15m", // 15 minutes
      REFRESH: "7d", // 7 days
    },
  },
} as const) satisfies AuthConfig; 