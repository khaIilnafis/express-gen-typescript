/**
 * Authentication types
 */

import { AuthTypes } from "./types.js";
import { AuthStrategies } from "./strategies.js";
import { AuthConfig } from "./config.js";
import { AuthMessages } from "./messages.js";

/**
 * Type definition for authentication structure
 */
export interface AuthStructure {
  TYPES: AuthTypes;
  STRATEGIES: AuthStrategies;
  CONFIG: AuthConfig;
  MESSAGES: AuthMessages;
}

export type { AuthTypes, AuthStrategies, AuthConfig, AuthMessages };
