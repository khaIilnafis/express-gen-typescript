import { MethodExpressionIR } from "../../../types/index.js";

const INIT: MethodExpressionIR = {
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
const BOOTSTRAP: MethodExpressionIR = {
  expressionType: "return",
  target: { object: "this", property: "" },
  arguments: [
    {
      type: "constructor_call",
      value: "Server",
      arguments: [],
    },
  ],
};

export { BOOTSTRAP, INIT };
