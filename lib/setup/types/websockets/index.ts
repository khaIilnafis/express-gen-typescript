import { WebSocketLibraries } from "./libraries.js";
import {
  WebSocketEvents,
  CommonWebSocketEvents,
  SocketIOEvents,
} from "./events.js";
import { WebSocketConfig, SocketIOConfig, WSConfig } from "./config.js";

/**
 * Type definition for WebSocket structure
 */
interface WebSocketStructure {
  LIBRARIES: WebSocketLibraries;
  EVENTS: WebSocketEvents;
  CONFIG: WebSocketConfig;
}

export type {
  WebSocketStructure,
  WebSocketLibraries,
  WebSocketEvents,
  WebSocketConfig,
  CommonWebSocketEvents,
  SocketIOEvents,
  SocketIOConfig,
  WSConfig,
};
