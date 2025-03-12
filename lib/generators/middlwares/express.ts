import {
  MethodExpressionIR,
  DependencyIR,
  MiddlewareConfig,
} from "../../types/index.js";

const jsonBodyInit: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "use",
  arguments: [
    {
      type: "function_call",
      value: null,
      target: "express",
      property: "json",
      arguments: [],
    },
  ],
};
const urlEncodeInit: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "use",
  arguments: [
    {
      type: "function_call",
      value: null,
      target: "express",
      property: "urlencoded",
      arguments: [
        {
          type: "object",
          value: null,
          properties: {
            extended: { type: "literal", value: true },
          },
        },
      ],
    },
  ],
};
const setViewsDir: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "set",
  arguments: [
    { type: "literal", value: "views" },
    {
      type: "function_call",
      value: null,
      target: "path",
      property: "join",
      arguments: [
        { type: "identifier", value: "__dirname" },
        { type: "literal", value: "views" },
      ],
    },
  ],
};
const setViewEngine: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "set",
  arguments: [
    { type: "literal", value: "view engine" },
    { type: "literal", value: "ejs" },
  ],
};
const expressDeps: DependencyIR = {
  BASE: {
    name: "helmet",
    version: "^8.0.0",
  },
  BASE_DEV: {
    name: "@types/helmet",
    version: "^4.0.0",
  },
};
export const EXPRESS: MiddlewareConfig<{
  jsonBodyInit: MethodExpressionIR;
  urlEncodeInit: MethodExpressionIR;
  setViewEngine: MethodExpressionIR;
  setViewsDir: MethodExpressionIR;
}> = Object.freeze({
  DEPS: expressDeps,
  METHODS: {
    jsonBodyInit,
    urlEncodeInit,
    setViewEngine,
    setViewsDir,
  },
  IMPORTS: {},
}) satisfies MiddlewareConfig;

// "express-session": Object.freeze({
//       deps: Object.freeze({
//         "express-session": "^1.17.3",
//         "connect-flash": "^0.1.1",
//       }),
//       devDeps: Object.freeze({
//         "@types/express-session": "^1.17.7",
//         "@types/connect-flash": "^0.0.37",
//       }),
//     }),
