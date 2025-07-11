import {
  FunctionExpressionIR,
  MethodExpressionIR,
} from "../../../types/index.js";

// For the bind variable declaration in the error handler
const bindVariableDeclaration: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  arguments: [],
  declarations: [
    {
      id: "bind",
      init: {
        type: "conditional_expression",
        test: {
          type: "binary_expression",
          operator: "===",
          left: {
            type: "unary_expression",
            unaryOperator: "typeof",
            arguments: [
              {
                type: "identifier",
                value: "port",
              },
            ],
          },
          right: {
            type: "literal",
            value: "string",
          },
        },
        consequent: {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "literal",
            value: "Pipe ",
          },
          right: {
            type: "identifier",
            value: "port",
          },
        },
        alternate: {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "literal",
            value: "Port ",
          },
          right: {
            type: "identifier",
            value: "port",
          },
        },
      },
    },
  ],
};

// For the EACCES case in the error handler
const eaccessErrorCase: MethodExpressionIR = {
  expressionType: "switch_case",
  target: { object: "", property: "" },
  arguments: [],
  caseValue: "EACCES",
  statements: [
    {
      expressionType: "method_call",
      target: { object: "console", property: "error" },
      arguments: [
        {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "identifier",
            value: "bind",
          },
          right: {
            type: "property_access",
            target: "err",
            property: "message",
          },
        },
      ],
    },
    {
      expressionType: "method_call",
      target: { object: "process", property: "exit" },
      arguments: [
        {
          type: "literal",
          value: 1,
        },
      ],
    },
  ],
};

// For the EADDRINUSE case in the error handler
const eaddrInUseErrorCase: MethodExpressionIR = {
  expressionType: "switch_case",
  target: { object: "", property: "" },
  arguments: [],
  caseValue: "EADDRINUSE",
  statements: [
    {
      expressionType: "method_call",
      target: { object: "console", property: "error" },
      arguments: [
        {
          type: "binary_expression",
          operator: "+",
          left: {
            type: "identifier",
            value: "bind",
          },
          right: {
            type: "property_access",
            target: "err",
            property: "message",
          },
        },
      ],
    },
    {
      expressionType: "method_call",
      target: { object: "process", property: "exit" },
      arguments: [
        {
          type: "literal",
          value: 1,
        },
      ],
    },
  ],
};

// For the default case in the error handler
const defaultErrorCase: MethodExpressionIR = {
  expressionType: "switch_case",
  target: { object: "", property: "" },
  arguments: [],
  caseValue: null, // null for default case
  statements: [
    {
      expressionType: "throw",
      target: { object: "", property: "" },
      arguments: [
        {
          type: "identifier",
          value: "err",
        },
      ],
    },
  ],
};
// For the switch statement in the error handler
const errorSwitch: MethodExpressionIR = {
  expressionType: "switch_statement",
  target: { object: "", property: "" },
  arguments: [],
  discriminant: {
    type: "property_access",
    target: "err",
    property: "name",
  },
  cases: [eaccessErrorCase, eaddrInUseErrorCase, defaultErrorCase],
};
// const errorHandlerBody = {
//   BIND_DECLARATION: bindVariableDeclaration,
//   ERROR_SWITCH: errorSwitch,
// };
// For the server.listen callback function
const listenCallback: FunctionExpressionIR = {
  type: "arrow_function",
  parameters: [],
  body: [
    {
      expressionType: "method_call",
      target: { object: "console", property: "log" },
      arguments: [
        {
          type: "template_literal",
          quasis: [
            { text: "Server running on port ", isExpression: false },
            { text: "", isExpression: false },
          ],
          expressions: [
            {
              type: "identifier",
              value: "port",
            },
          ],
        },
      ],
    },
  ],
};
// For the server.listen call
const serverListenCall: MethodExpressionIR = {
  expressionType: "method_call",
  target: { object: "this.server", property: "listen" },
  arguments: [
    {
      type: "identifier",
      value: "port",
    },
    {
      type: "function_call",
      functionExpression: listenCallback,
    },
  ],
};

// For the server.on('error') call
const serverErrorHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: { object: "this.server", property: "on" },
  arguments: [
    {
      type: "literal",
      value: "error",
    },
    {
      type: "function_call",
      functionExpression: {
        type: "arrow_function",
        parameters: [
          {
            name: "err",
            type: "Error",
          },
        ],
        body: [bindVariableDeclaration, errorSwitch],
      },
    },
  ],
};
const LISTEN = {
  SERVER_LISTEN: serverListenCall,
  ERROR_HANDLER: serverErrorHandler,
};
export default LISTEN;
