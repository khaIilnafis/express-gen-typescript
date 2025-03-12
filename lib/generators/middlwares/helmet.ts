import {
  ImportConfig,
  MethodExpressionIR,
  DependencyIR,
  MiddlewareConfig,
} from "../../types/index.js";
const helmetImport: ImportConfig = {
  NAME: "helmet",
  DEFAULT: {
    HELMET: "helmet",
  },
  NAMED: {},
};
const helmetInit: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "use",
  arguments: [{ type: "function_call", value: "helmet", arguments: [] }],
};
const helmetDeps: DependencyIR = {
  BASE: {
    name: "helmet",
    version: "^8.0.0",
  },
  BASE_DEV: {
    name: "@types/helmet",
    version: "^4.0.0",
  },
};
export const HELMET: MiddlewareConfig<
  { helmetInit: MethodExpressionIR },
  { helmetImport: ImportConfig }
> = Object.freeze({
  IMPORTS: {
    helmetImport,
  },
  METHODS: {
    helmetInit,
  },
  DEPS: helmetDeps,
}) satisfies MiddlewareConfig;
