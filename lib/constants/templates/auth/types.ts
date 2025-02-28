/**
 * Authentication types constants
 * Contains constants related to authentication methods
 */

/**
 * Type definition for authentication types
 */
export interface AuthTypes {
  NONE: string;
  PASSPORT: string;
  JWT: string;
  EXPRESS_SESSION: string;
}

/**
 * Authentication type constants
 * Defines all supported authentication methods
 */
export const TYPES = Object.freeze({
  NONE: "none",
  PASSPORT: "passport",
  JWT: "jwt",
  EXPRESS_SESSION: "express-session",
} as const) satisfies AuthTypes; 