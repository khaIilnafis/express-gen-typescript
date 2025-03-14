import {
  ImportConfig,
  MethodExpressionIR,
  DependencyIR,
  MiddlewareConfig,
} from "../../types/index.js";

const corsImport: ImportConfig = {
  NAME: "cors",
  DEFAULT: {
    CORS: "cors",
  },
  NAMED: {},
};
const corsInit: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "use",
  arguments: [{ type: "function_call", value: "cors", arguments: [] }],
};

const corsDeps: DependencyIR = {
  BASE: {
    name: "helmet",
    version: "^8.0.0",
  },
  BASE_DEV: {
    name: "@types/helmet",
    version: "^4.0.0",
  },
};
export const CORS: MiddlewareConfig<
  { corsInit: MethodExpressionIR },
  { corsImport: ImportConfig }
> = Object.freeze({
  IMPORTS: {
    corsImport,
  },
  METHODS: {
    corsInit,
  },
  DEPS: corsDeps,
});
