/**
 * Server WebSocket method constants
 * Contains WebSocket implementation methods for different WebSocket libraries
 */

import { ServerWebsocketMethods } from "../../types/server/index.js";

export const WEBSOCKET_METHODS = Object.freeze({
  SOCKETIO: `
  private initializeWebSockets(): void {
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST']
      }
    });
    
    // Setup Socket.io event handlers
    setupSocketHandlers(this.io);
  }`,
  WS: `
  private initializeWebSockets(): void {
    this.wss = new WebSocket.Server({ server: this.server });
    
    // Setup WebSocket event handlers
    setupWebSocketServer(this.wss);
  }`,
} as const) satisfies ServerWebsocketMethods;
