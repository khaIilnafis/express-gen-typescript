import {
  ImportConfig,
  MethodExpressionIR,
  ImportsFromConfig,
} from "../../types/index.js";

/**
 * Services Imports Configuration
 */
const modelImports: ImportsFromConfig<{
  MODEL: ImportConfig;
}> = {
  MODEL: {
    NAME: "../../models",
    DEFAULT: {},
    NAMED: {
      EXAMPLE: "Example",
    },
  },
};

/**
 * Find One Example Method
 */
const findOneExample: MethodExpressionIR = {
  expressionType: "method_call",
  target: {
    object: "Example",
    property: "findOne",
  },
  arguments: [
    {
      type: "object",
      properties: {
        exampleId: {
          type: "identifier",
          value: "exampleId",
        },
      },
    },
  ],
};

/**
 * Return Expression - this is just a placeholder
 * The actual implementation will be done in the AST directly
 * since the await expression is not easily represented in the IR
 */
const returnFindOne: MethodExpressionIR = {
  expressionType: "return",
  target: {
    object: "",
    property: "",
  },
  arguments: [
    {
      type: "function_call",
      target: "Example",
      property: "findOne",
      arguments: [
        {
          type: "object",
          properties: {
            exampleId: {
              type: "identifier",
              value: "exampleId",
            },
          },
        },
      ],
    },
  ],
};

/**
 * Model Service Configuration
 */
const MODEL = {
  IMPORTS: modelImports,
  FIND_ONE: findOneExample,
  RETURN_FIND_ONE: returnFindOne,
};

/**
 * Export configurations
 */
export const SERVICES_CONFIG = Object.freeze({
  MODEL,
});
