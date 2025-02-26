/**
 * Authentication paths constants
 * Contains file path patterns for authentication-related files
 */

/**
 * Type definition for authentication file paths
 */
export interface AuthFilePaths {
  PASSPORT: {
    CONFIG: string;
    LOCAL_STRATEGY: string;
    JWT_STRATEGY: string;
  };
  MIDDLEWARE: {
    AUTH: string;
  };
}

/**
 * Type definition for authentication paths
 */
export interface AuthPaths {
  FILES: AuthFilePaths;
}

/**
 * Authentication path constants
 * Defines file paths for authentication-related files
 */
export const PATHS = Object.freeze({
  FILES: {
    PASSPORT: {
      CONFIG: "auth/passport.ts",
      LOCAL_STRATEGY: "auth/strategies/local.ts",
      JWT_STRATEGY: "auth/strategies/jwt.ts",
    },
    MIDDLEWARE: {
      AUTH: "middleware/auth.ts",
    },
  },
} as const) satisfies AuthPaths; 