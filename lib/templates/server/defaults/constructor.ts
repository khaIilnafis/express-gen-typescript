import { MethodExpressionIR } from "../../../types/index.js";

const initExpressInstance: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  expressionType: "assignment",
  arguments: [{ type: "function_call", value: "express" }],
};
const initServerInstance: MethodExpressionIR = {
  target: { object: "this", property: "server" },
  expressionType: "assignment",
  arguments: [
    {
      type: "function_call",
      value: "",
      target: "http",
      property: "createServer",
      arguments: [
        {
          type: "property_access",
          value: "",
          target: "this",
          property: "app",
        },
      ],
    },
  ],
};
const setPort: MethodExpressionIR = {
  target: { object: "this", property: "port" },
  expressionType: "assignment",
  arguments: [
    {
      type: "logical_expression",
      operator: "||",
      left: {
        type: "property_access",
        target: "process.env",
        property: "PORT",
      },
      right: { type: "literal", value: 3000 },
    },
  ],
};
const initializeMiddlewares: MethodExpressionIR = {
  target: { object: "this", property: "initializeMiddlewares" },
  expressionType: "method_call",
  arguments: [],
};
const initalizeWebsockets: MethodExpressionIR = {
  target: { object: "this", property: "initializeWebSockets" },
  expressionType: "method_call",
  arguments: [],
};
const initializeRoutes: MethodExpressionIR = {
  target: { object: "this", property: "initializeRoutes" },
  expressionType: "method_call",
  arguments: [],
};
const initializeErrorHandling: MethodExpressionIR = {
  target: { object: "this", property: "initializeErrorHandling" },
  expressionType: "method_call",
  arguments: [],
};
const initalizeConnectToDatabase: MethodExpressionIR = {
  target: { object: "Server", property: "connectToDatabase" },
  expressionType: "method_call",
  arguments: [],
};
const CONSTRUCTOR = {
  initExpressInstance,
  initServerInstance,
  setPort,
  initializeMiddlewares,
  initalizeWebsockets,
  initializeRoutes,
  initializeErrorHandling,
  initalizeConnectToDatabase,
};
export default CONSTRUCTOR;
