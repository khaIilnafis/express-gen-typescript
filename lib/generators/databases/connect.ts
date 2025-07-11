import { MethodExpressionIR } from "../../types/index.js";

const CONNECT_DATABASE: MethodExpressionIR = {
  expressionType: "try_catch",
  target: { object: "", property: "" },
  arguments: [],
  tryCatchBlock: {
    tryBlock: [
      {
        expressionType: "await",
        target: { object: "", property: "" },
        arguments: [
          { type: "function_call", value: "initializeDatabase", arguments: [] },
        ],
      },
      {
        expressionType: "method_call",
        target: { object: "console", property: "log" },
        arguments: [
          {
            type: "literal",
            value: "Database connection established successfully.",
          },
        ],
      },
    ],
    catchParameter: "error",
    catchBlock: [
      {
        expressionType: "method_call",
        target: { object: "console", property: "error" },
        arguments: [
          { type: "literal", value: "Database connection error:" },
          { type: "identifier", value: "error" },
        ],
      },
    ],
  },
};

export default CONNECT_DATABASE;
