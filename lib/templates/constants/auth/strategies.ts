/**
 * Authentication strategies constants
 * Contains constants related to Passport.js authentication strategies
 */

import { AuthStrategies } from "../../types/auth/index.js";

export const STRATEGIES = Object.freeze({
  PASSPORT: {
    LOCAL: "local",
    JWT: "jwt",
    GOOGLE: "google-oauth20",
    FACEBOOK: "facebook",
    GITHUB: "github",
  },
} as const) satisfies AuthStrategies;
