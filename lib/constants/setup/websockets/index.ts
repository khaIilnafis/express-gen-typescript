/**
 * WebSocket constants
 * Contains constants related to WebSocket libraries, configurations, and events
 */

import { LIBRARIES, WebSocketLibraries } from "./libraries.js";
import { EVENTS, WebSocketEvents } from "./events.js";
import { CONFIG, WebSocketConfig } from "./config.js";

/**
 * Type definition for WebSocket structure
 */
export interface WebSocketStructure {
  LIBRARIES: WebSocketLibraries;
  EVENTS: WebSocketEvents;
  CONFIG: WebSocketConfig;
}

/**
 * Re-export individual WebSocket constants
 */
export {
  LIBRARIES,
  EVENTS,
  CONFIG,
};

export type {
  WebSocketLibraries,
  WebSocketEvents,
  WebSocketConfig,
};

/**
 * Main WebSocket constants
 * Combines all WebSocket-related constants into a unified structure
 */
export const WEBSOCKETS = Object.freeze({
  LIBRARIES,
  EVENTS,
  CONFIG,
} as const) satisfies WebSocketStructure; 