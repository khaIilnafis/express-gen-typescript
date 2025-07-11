import { MethodExpressionIR } from "../../../types/index.js";

// 404 handler middleware
const notFoundHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "use",
  },
  arguments: [
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "req",
            type: "Request",
          },
          {
            name: "res",
            type: "Response",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "res.status(404)",
              property: "json",
            },
            arguments: [
              {
                type: "object",
                properties: {
                  message: {
                    type: "literal",
                    value: "Not Found",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

// Global error handler middleware
const errorHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "use",
  },
  arguments: [
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "error",
            type: "any",
          },
          {
            name: "req",
            type: "Request",
          },
          {
            name: "res",
            type: "Response",
          },
          {
            name: "next",
            type: "NextFunction",
          },
        ],
        body: [
          {
            expressionType: "method_call",
            target: {
              object: "console",
              property: "error",
            },
            arguments: [
              {
                type: "identifier",
                value: "error",
              },
            ],
          },
          {
            expressionType: "method_call",
            target: {
              object: "res.status(500)",
              property: "json",
            },
            arguments: [
              {
                type: "object",
                properties: {
                  message: {
                    type: "literal",
                    value: "Internal Server Error",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
const ERROR_HANDLER = {
  NOT_FOUND_HANDLER: notFoundHandler,
  GLOBAL_ERROR_HANDLER: errorHandler,
};
export default ERROR_HANDLER;
