/**
 * Server constructor calls constants
 * Contains constructor method calls for different server features
 */

/**
 * Type definition for server constructor calls
 */
export interface ServerConstructorCalls {
  DATABASE: string;
  WEBSOCKET: string;
}

/**
 * Server constructor calls for different features
 */
export const CONSTRUCTOR_CALLS = Object.freeze({
  DATABASE: "this.connectToDatabase();\n",
  WEBSOCKET: "    this.initializeWebSockets();\n",
} as const) satisfies ServerConstructorCalls; 