import { MethodExpressionIR } from "../../../types/index.js";

const routerDeclaration: MethodExpressionIR = {
  expressionType: "variable_declaration",
  target: { object: "", property: "" },
  variableKind: "const",
  arguments: [],
  declarations: [
    {
      id: "router",
      init: {
        type: "function_call",
        value: "initializeRoutes",
        arguments: [
          {
            type: "property_access",
            target: "this",
            property: "io",
          },
        ],
      },
    },
  ],
};
const apiRoutes: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "use",
  },
  arguments: [
    {
      type: "literal",
      value: "/api",
    },
    {
      type: "identifier",
      value: "router",
    },
  ],
};
const api404: MethodExpressionIR = {
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
          {
            name: "next",
            type: "NextFunction",
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
                  error: {
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
const rootHandler: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "this.app",
    property: "get",
  },
  arguments: [
    {
      type: "literal",
      value: "/",
    },
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
              object: "res",
              property: "render",
            },
            arguments: [
              {
                type: "literal",
                value: "index",
              },
              {
                type: "object",
                properties: {
                  title: {
                    type: "literal",
                    value: "Express TypeScript App",
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
// New initializeRoutes generator object
const ROUTES = {
  ROUTER_DECLARATION: routerDeclaration,
  API_ROUTES: apiRoutes,
  ROOT_HANDLER: rootHandler,
  API_404_HANDLER: api404,
};
export default ROUTES;
