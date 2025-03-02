/**
 * Authentication types constants
 * Contains constants related to authentication methods
 */

import { AuthTypes } from "../../types/auth/index.js";

export const TYPES = Object.freeze({
  NONE: "none",
  PASSPORT: "passport",
  JWT: "jwt",
  EXPRESS_SESSION: "express-session",
} as const) satisfies AuthTypes;
