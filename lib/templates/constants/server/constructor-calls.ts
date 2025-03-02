/**
 * Server constructor calls constants
 * Contains constructor method calls for different server features
 */

import { ServerConstructorCalls } from "../../types/server/index.js";

export const CONSTRUCTOR_CALLS = Object.freeze({
  DATABASE: "this.connectToDatabase();\n",
  WEBSOCKET: "    this.initializeWebSockets();\n",
} as const) satisfies ServerConstructorCalls;
