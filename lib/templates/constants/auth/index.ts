/**
 * Authentication constants
 * Contains constants related to authentication types, strategies, and configuration
 */

import { TYPES } from "./types.js";
import { STRATEGIES } from "./strategies.js";
import { CONFIG } from "./config.js";
import { MESSAGES } from "./messages.js";
import { AuthStructure } from "../../types/auth/index.js";

/**
 * Re-export individual authentication constants
 */
export { TYPES, STRATEGIES, CONFIG, MESSAGES };
/**
 * Main authentication constants
 * Combines all authentication-related constants into a unified structure
 */
export const AUTH = Object.freeze({
  TYPES,
  STRATEGIES,
  CONFIG,
  MESSAGES,
} as const) satisfies AuthStructure;
