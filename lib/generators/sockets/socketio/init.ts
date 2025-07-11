import { MethodExpressionIR } from "../../../types/index.js";

const ioAssignment: MethodExpressionIR = {
  expressionType: "assignment",
  target: {
    object: "this",
    property: "io",
  },
  method: "=",
  arguments: [
    {
      type: "constructor_call",
      value: "SocketIOServer",
      arguments: [
        {
          type: "property_access",
          target: "this",
          property: "server",
        },
        {
          type: "object",
          properties: {
            cors: {
              type: "object",
              properties: {
                origin: {
                  type: "literal",
                  value: "*",
                },
              },
            },
          },
        },
      ],
    },
  ],
};
const onConnection: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this",
    property: "io",
  },
  method: "on",
  arguments: [
    {
      type: "literal",
      value: "connection",
    },
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "socket",
            type: "Socket",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "console",
              property: "log",
            },
            // method: "",
            arguments: [
              {
                type: "literal",
                isTemplate: true,
                templateParts: [
                  { text: "Socket connected: ", isExpression: false },
                  { text: "", isExpression: true },
                ],
                templateExpressions: [
                  {
                    type: "property_access",
                    target: "socket",
                    property: "id",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};
const INIT = {
  ASSIGNMENT: ioAssignment,
  LISTENER: onConnection,
};
export default INIT;
