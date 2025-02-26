/**
 * Server middleware setup constants
 * Contains middleware setup code for different server features
 */

/**
 * Type definition for server middleware
 */
export interface ServerMiddleware {
  AUTH: {
    PASSPORT: string;
  };
}

/**
 * Authentication middleware setup
 */
export const MIDDLEWARE = Object.freeze({
  AUTH: {
    PASSPORT:
      "\n    // Initialize Passport.js authentication\n    this.app.use(passport.initialize());",
  },
} as const) satisfies ServerMiddleware; 