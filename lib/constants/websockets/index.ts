/**
 * WebSocket constants
 * Contains constants related to WebSocket libraries, configurations, and events
 */

import { LIBRARIES, WebSocketLibraries } from "./libraries.js";
import { EVENTS, WebSocketEvents } from "./events.js";
import { CONFIG, WebSocketConfig } from "./config.js";
import { PATHS, WebSocketPaths } from "./paths.js";
import { MESSAGES, WebSocketMessages } from "./messages.js";

/**
 * Type definition for WebSocket structure
 */
export interface WebSocketStructure {
  LIBRARIES: WebSocketLibraries;
  EVENTS: WebSocketEvents;
  CONFIG: WebSocketConfig;
  PATHS: WebSocketPaths;
  MESSAGES: WebSocketMessages;
}

/**
 * Re-export individual WebSocket constants
 */
export {
  LIBRARIES,
  EVENTS,
  CONFIG,
  PATHS,
  MESSAGES,
};

export type {
  WebSocketLibraries,
  WebSocketEvents,
  WebSocketConfig,
  WebSocketPaths,
  WebSocketMessages,
};

/**
 * Main WebSocket constants
 * Combines all WebSocket-related constants into a unified structure
 */
export const WEBSOCKETS = Object.freeze({
  LIBRARIES,
  EVENTS,
  CONFIG,
  PATHS,
  MESSAGES,
} as const) satisfies WebSocketStructure; 