import {
  ImportConfig,
  MethodExpressionIR,
  DependencyIR,
  MiddlewareConfig,
} from "../../types/index.js";

const morganImport: ImportConfig = {
  NAME: "morgan",
  DEFAULT: {
    MORGAN: "morgan",
  },
  NAMED: {},
};
const morganInit: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "use",
  arguments: [
    {
      type: "function_call",
      value: "morgan",
      arguments: [{ type: "literal", value: "dev" }],
    },
  ],
};

const morganDeps: DependencyIR = {
  BASE: {
    name: "helmet",
    version: "^8.0.0",
  },
  BASE_DEV: {
    name: "@types/helmet",
    version: "^4.0.0",
  },
};
export const MORGAN: MiddlewareConfig<
  {
    morganInit: MethodExpressionIR;
  },
  {
    morganImport: ImportConfig;
  }
> = Object.freeze({
  IMPORTS: { morganImport },
  METHODS: { morganInit },
  DEPS: morganDeps,
});
