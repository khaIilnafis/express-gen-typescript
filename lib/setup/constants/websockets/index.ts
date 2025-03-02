/**
 * WebSocket constants
 * Contains constants related to WebSocket libraries, configurations, and events
 */

import { LIBRARIES } from "./libraries.js";
import { EVENTS } from "./events.js";
import { CONFIG } from "./config.js";
import { WebSocketStructure } from "../../types/websockets/index.js";

/**
 * Re-export individual WebSocket constants
 */
export { LIBRARIES, EVENTS, CONFIG };

/**
 * Main WebSocket constants
 * Combines all WebSocket-related constants into a unified structure
 */
export const WEBSOCKETS = Object.freeze({
  LIBRARIES,
  EVENTS,
  CONFIG,
} as const) satisfies WebSocketStructure;
