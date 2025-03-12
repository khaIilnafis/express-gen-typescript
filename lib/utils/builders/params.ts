import * as recast from "recast";
import { ParameterIR } from "../../types/index.js";

const b = recast.types.builders;
/**
 * Builds a list of function parameters from ParameterIR objects
 * @param parameters Array of parameter IR definitions
 * @returns Array of AST pattern nodes representing function parameters
 */
export function buildParameters(
  parameters: ParameterIR[],
): recast.types.namedTypes.Pattern[] {
  return parameters.map((param) => {
    // Create the parameter identifier
    const identifier = b.identifier(param.name);

    // Add type annotation if provided
    if (param.type) {
      identifier.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier(param.type)),
      );
    }

    // Handle optional parameters
    if (param.isOptional) {
      // Mark parameter as optional in TypeScript
      identifier.optional = true;
    }

    // Handle default values
    if (param.defaultValue !== undefined) {
      // Create an assignment pattern for the default value
      return b.assignmentPattern(
        identifier,
        //@ts-expect-error recast type issues
        getLiteralForValue(param.defaultValue),
      );
    }

    return identifier;
  });
}

/**
 * Helper function to convert JavaScript values to AST literals
 */
export function getLiteralForValue(
  value: string | number | boolean | null | object | [],
): recast.types.namedTypes.Expression {
  if (typeof value === "string") {
    return b.stringLiteral(value);
  } else if (typeof value === "number") {
    return b.numericLiteral(value);
  } else if (typeof value === "boolean") {
    return b.booleanLiteral(value);
  } else if (value === null) {
    return b.nullLiteral();
  } else if (Array.isArray(value)) {
    //@ts-expect-error recast type issues
    return b.arrayExpression(value.map(getLiteralForValue));
  } else if (typeof value === "object") {
    const properties = Object.entries(value).map(([key, propValue]) => {
      return b.objectProperty(
        b.identifier(key),
        //@ts-expect-error recast type issues
        getLiteralForValue(propValue),
      );
    });
    return b.objectExpression(properties);
  } else {
    // Default for undefined or other types
    return b.identifier("undefined");
  }
}
