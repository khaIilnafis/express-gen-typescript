/**
 * Common constants domain
 * Contains general-purpose constants shared across the application
 */

import { MESSAGES, ApplicationMessages } from './messages.js';

/**
 * Type definition for common constants
 */
export interface CommonConstants {
  MESSAGES: ApplicationMessages;
}

/**
 * Re-export individual common constants
 */
export { MESSAGES };
export type { ApplicationMessages };

/**
 * Main common constants
 * Combines all common constants into a unified structure
 */
export const COMMON = Object.freeze({
  MESSAGES,
} as const) satisfies CommonConstants; 