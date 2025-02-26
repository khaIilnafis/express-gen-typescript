/**
 * Authentication strategies constants
 * Contains constants related to Passport.js authentication strategies
 */

/**
 * Type definition for Passport.js strategies
 */
export interface PassportStrategies {
  LOCAL: string;
  JWT: string;
  GOOGLE: string;
  FACEBOOK: string;
  GITHUB: string;
}

/**
 * Type definition for authentication strategies
 */
export interface AuthStrategies {
  PASSPORT: PassportStrategies;
}

/**
 * Authentication strategy constants
 * Defines all supported authentication strategies
 */
export const STRATEGIES = Object.freeze({
  PASSPORT: {
    LOCAL: "local",
    JWT: "jwt",
    GOOGLE: "google-oauth20",
    FACEBOOK: "facebook",
    GITHUB: "github",
  },
} as const) satisfies AuthStrategies; 