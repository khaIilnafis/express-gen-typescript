import {
  ImportConfig,
  ImportsFromConfig,
  MethodExpressionIR,
} from "../../types/index.js";

// Imports for the bin/www file
const imports: ImportsFromConfig<{
  SERVER: ImportConfig;
}> = {
  SERVER: {
    NAME: "../src/server",
    DEFAULT: {},
    NAMED: {
      SERVER: "Server",
    },
  },
};

// Normalize port function expressions
const normalizePortBody: MethodExpressionIR[] = [
  // const port = parseInt(val, 10)
  {
    expressionType: "variable_declaration",
    target: { object: "", property: "" },
    variableKind: "const",
    declarations: [
      {
        id: "port",
        init: {
          type: "function_call",
          value: "parseInt",
          arguments: [
            { type: "identifier", value: "val" },
            { type: "literal", value: 10 },
          ],
        },
      },
    ],
    arguments: [],
  },
  // if (isNaN(port)) { return 3000; }
  {
    expressionType: "conditional",
    target: { object: "", property: "" },
    arguments: [
      {
        type: "function_call",
        value: "isNaN",
        arguments: [{ type: "identifier", value: "port" }],
      },
    ],
    tryCatchBlock: {
      tryBlock: [
        {
          expressionType: "return",
          target: { object: "", property: "" },
          arguments: [{ type: "literal", value: 3000 }],
        },
      ],
    },
  },
  // if (port >= 0) { return port; }
  {
    expressionType: "conditional",
    target: { object: "", property: "" },
    arguments: [
      {
        type: "binary_expression",
        operator: ">=",
        left: { type: "identifier", value: "port" },
        right: { type: "literal", value: 0 },
      },
    ],
    tryCatchBlock: {
      tryBlock: [
        {
          expressionType: "return",
          target: { object: "", property: "" },
          arguments: [{ type: "identifier", value: "port" }],
        },
      ],
    },
  },
  // return 3000;
  {
    expressionType: "return",
    target: { object: "", property: "" },
    arguments: [{ type: "literal", value: 3000 }],
  },
];

// Normalize port function method definition
const normalizePortFunction = {
  name: "normalizePort",
  parameters: [
    {
      name: "val",
      type: "string",
    },
  ],
  returnType: "number",
  expressions: normalizePortBody,
};

// Port declaration
const portDeclaration: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  declarations: [
    {
      id: "port",
      init: {
        type: "function_call",
        value: "normalizePort",
        arguments: [
          {
            type: "logical_expression",
            operator: "||",
            left: {
              type: "property_access",
              target: "process.env",
              property: "PORT",
            },
            right: { type: "literal", value: "3000" },
          },
        ],
      },
    },
  ],
  arguments: [],
};

// Server declaration
const serverDeclaration: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  declarations: [
    {
      id: "server",
      init: {
        type: "function_call",
        target: "Server",
        property: "bootstrap",
        arguments: [],
      },
    },
  ],
  arguments: [],
};

// Server listen statement
const listenStatement: MethodExpressionIR = {
  expressionType: "method_call",
  target: { object: "server", property: "listen" },
  arguments: [{ type: "identifier", value: "port" }],
};

// Comments for bin/www elements
const COMMENTS = {
  NORMALIZE_PORT: `*\n * Normalize a port into a number, string, or false.\n `,
  PORT_DECLARATION: `*\n * Get port from environment and store in Express.\n `,
  SERVER_DECLARATION: `*\n * Create HTTP server.\n `,
  LISTEN_STATEMENT: `*\n * Listen on provided port, on all network interfaces.\n `,
};

export const BIN_CONFIG = Object.freeze({
  IMPORTS: imports,
  NORMALIZE_PORT_BODY: normalizePortBody,
  NORMALIZE_PORT: normalizePortFunction,
  PORT_DECLARATION: portDeclaration,
  SERVER_DECLARATION: serverDeclaration,
  LISTEN_STATEMENT: listenStatement,
  COMMENTS,
});
