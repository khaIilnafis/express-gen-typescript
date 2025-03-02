/**
 * Server middleware setup constants
 * Contains middleware setup code for different server features
 */

import { ServerMiddleware } from "../../types/server/index.js";

export const MIDDLEWARE = Object.freeze({
  AUTH: {
    PASSPORT:
      "\n    // Initialize Passport.js authentication\n    this.app.use(passport.initialize());",
  },
} as const) satisfies ServerMiddleware;
