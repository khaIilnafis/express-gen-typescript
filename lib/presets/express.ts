import { ImportConfig, MethodExpressionIR } from "../types/config.js";

const expressImports: ImportConfig = {
  NAME: "express",
  DEFAULT: {
    EXPRESS: "express",
  },
  NAMED: {
    APPLICATION: "Application",
    REQUEST: "Request",
    RESPONSE: "Response",
    NEXT: "NextFunction",
  },
};
const expressInit: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "=",
  arguments: [{ type: "function_call", value: "express" }],
};

export const EXPRESS = Object.freeze({
  imports: expressImports,
  init: expressInit,
});
