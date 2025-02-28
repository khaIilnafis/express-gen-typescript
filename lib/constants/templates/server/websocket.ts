/**
 * Server WebSocket method constants
 * Contains WebSocket implementation methods for different WebSocket libraries
 */

/**
 * Type definition for server WebSocket methods
 */
export interface ServerWebsocketMethods {
  SOCKETIO: string;
  WS: string;
}

/**
 * WebSocket method implementations (fallbacks when templates don't exist)
 */
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