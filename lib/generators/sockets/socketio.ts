import {
  ImportConfig,
  ImportsFromConfig,
  MethodExpressionIR,
  MethodDefinitionIR,
} from "../../types/index.js";

/**
 * Socket.IO imports
 */
const socketIoImports: ImportsFromConfig<{
  SOCKETIO: ImportConfig;
}> = {
  SOCKETIO: {
    NAME: "socket.io",
    DEFAULT: {},
    NAMED: {
      SERVER: ["Server", "SocketIOServer"],
      SOCKET: "Socket",
    },
  },
};

/**
 * Console log connection expression
 */
const logConnection: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "console",
    property: "log",
  },
  arguments: [
    {
      type: "literal",
      value: "New client connected:",
    },
    {
      type: "property_access",
      target: "socket",
      property: "id",
    },
  ],
};

/**
 * Console log message received
 */
const logMessage: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "console",
    property: "log",
  },
  arguments: [
    {
      type: "literal",
      value: "Message received:",
    },
    {
      type: "identifier",
      value: "data",
    },
  ],
};

/**
 * Broadcast message to other clients
 */
const broadcastMessage: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "socket.broadcast",
    property: "emit",
  },
  arguments: [
    {
      type: "literal",
      value: "message",
    },
    {
      type: "object",
      properties: {
        user: {
          type: "property_access",
          target: "socket",
          property: "id",
        },
        text: {
          type: "property_access",
          target: "data",
          property: "text",
        },
        timestamp: {
          type: "constructor_call",
          value: "Date",
          arguments: [],
        },
      },
    },
  ],
};

/**
 * Console log disconnection
 */
const logDisconnection: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "console",
    property: "log",
  },
  arguments: [
    {
      type: "literal",
      value: "Client disconnected:",
    },
    {
      type: "property_access",
      target: "socket",
      property: "id",
    },
  ],
};

/**
 * Socket connection handler expression
 */
const connectionHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "io",
    property: "on",
  },
  arguments: [
    {
      type: "literal",
      value: "connection",
    },
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [{ name: "socket", type: "Socket" }],
        body: [
          // Log connection
          logConnection,

          // Message handler with callback
          {
            expressionType: "method_call",
            target: {
              object: "socket",
              property: "on",
            },
            arguments: [
              {
                type: "literal",
                value: "message",
              },
              {
                type: "function_call",
                functionExpression: {
                  type: "arrow_function",
                  parameters: [{ name: "data", type: "any" }],
                  body: [
                    // Log message
                    logMessage,
                    // Broadcast message
                    broadcastMessage,
                  ],
                },
              },
            ],
          },

          // Disconnect handler with callback
          {
            expressionType: "method_call",
            target: {
              object: "socket",
              property: "on",
            },
            arguments: [
              {
                type: "literal",
                value: "disconnect",
              },
              {
                type: "function_call",
                functionExpression: {
                  type: "arrow_function",
                  parameters: [],
                  body: [
                    // Log disconnection
                    logDisconnection,
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

/**
 * Setup Socket Handlers function definition
 */
const setupSocketHandlersFunction: MethodDefinitionIR = {
  name: "setupSocketHandlers",
  parameters: [{ name: "io", type: "SocketIOServer" }],
  returnType: "void",
  expressions: [connectionHandler],
};

/**
 * Socket.IO configuration
 */
export const SOCKETIO = Object.freeze({
  IMPORTS: socketIoImports,
  LOG_CONNECTION: logConnection,
  LOG_MESSAGE: logMessage,
  BROADCAST_MESSAGE: broadcastMessage,
  LOG_DISCONNECTION: logDisconnection,
  CONNECTION_HANDLER: connectionHandler,
  SETUP_HANDLERS: setupSocketHandlersFunction,
});
