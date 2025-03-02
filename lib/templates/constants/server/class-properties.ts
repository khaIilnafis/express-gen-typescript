/**
 * Server class properties constants
 * Contains class property declarations for different server features
 */

import { ServerClassProperties } from "../../types/server/index.js";

export const CLASS_PROPERTIES = Object.freeze({
  PRISMA: "public prisma: PrismaClient;\n",
  SOCKETIO: "public io!: SocketIOServer;\n",
  WS: "public wss!: WebSocket.Server;\n",
} as const) satisfies ServerClassProperties;
