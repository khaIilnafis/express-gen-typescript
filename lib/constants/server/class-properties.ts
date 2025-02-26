/**
 * Server class properties constants
 * Contains class property declarations for different server features
 */

/**
 * Type definition for server class properties
 */
export interface ServerClassProperties {
  PRISMA: string;
  SOCKETIO: string;
  WS: string;
}

/**
 * Server class properties for different features
 */
export const CLASS_PROPERTIES = Object.freeze({
  PRISMA: "public prisma: PrismaClient;\n",
  SOCKETIO: "public io!: SocketIOServer;\n",
  WS: "public wss!: WebSocket.Server;\n",
} as const) satisfies ServerClassProperties; 