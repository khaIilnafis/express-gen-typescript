/**
 * Authentication constants
 * Contains constants related to authentication types, strategies, and configuration
 */

import { TYPES, AuthTypes } from "./types.js";
import { STRATEGIES, AuthStrategies } from "./strategies.js";
import { CONFIG, AuthConfig } from "./config.js";
import { MESSAGES, AuthMessages } from "./messages.js";

/**
 * Type definition for authentication structure
 */
export interface AuthStructure {
  TYPES: AuthTypes;
  STRATEGIES: AuthStrategies;
  CONFIG: AuthConfig;
  MESSAGES: AuthMessages;
}

/**
 * Re-export individual authentication constants
 */
export {
  TYPES,
  STRATEGIES,
  CONFIG,
  MESSAGES,
};

export type {
  AuthTypes,
  AuthStrategies,
  AuthConfig,
  AuthMessages,
};

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