import * as recast from "recast";
import { MethodDefinitionIR, MethodArgumentIR } from "../../types/index.js";
import { buildExpression } from "./expressions.js";
import { buildParameters } from "./params.js";

const b = recast.types.builders;

export const buildMethod = (
  methodDef: MethodDefinitionIR,
): recast.types.namedTypes.MethodDefinition => {
  // Create method parameters
  const methodParams = buildParameters(methodDef.parameters);
  // Create method body statements
  const bodyStatements: recast.types.namedTypes.Statement[] =
    methodDef.expressions.map((expr) => buildExpression(expr));

  // Create the method definition
  const method = b.methodDefinition(
    "method",
    b.identifier(methodDef.name),
    b.functionExpression(
      null,
      //@ts-expect-error recast type issues
      methodParams,
      //@ts-expect-error recast type issues
      b.blockStatement(bodyStatements),
    ),
  );

  // Add return type if specified
  if (methodDef.returnType) {
    method.value.returnType = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier(methodDef.returnType)),
    );
  }

  return method;
};
// Helper function to build method arguments
export const buildMethodArgument = (
  arg: MethodArgumentIR,
): recast.types.namedTypes.Expression => {
  switch (arg.type) {
    case "literal":
      if (typeof arg.value === "string") {
        return b.stringLiteral(arg.value);
      } else if (typeof arg.value === "number") {
        return b.numericLiteral(arg.value);
      } else if (typeof arg.value === "boolean") {
        return b.booleanLiteral(arg.value);
      } else {
        return b.nullLiteral();
      }

    case "identifier":
      return b.identifier(arg.value as string);

    case "function_call":
      if (arg.target && arg.property) {
        // For calls like path.join
        return b.callExpression(
          b.memberExpression(
            b.identifier(arg.target),
            b.identifier(arg.property),
          ),
          //@ts-expect-error recast type issues
          (arg.arguments || []).map((subArg) => buildMethodArgument(subArg)),
        );
      } else {
        // For simple function calls like helmet()
        return b.callExpression(
          b.identifier(arg.value as string),
          //@ts-expect-error recast type issues
          (arg.arguments || []).map((subArg) => buildMethodArgument(subArg)),
        );
      }

    case "object": {
      if (!arg.properties) return b.objectExpression([]);

      const properties = Object.entries(arg.properties).map(([key, value]) => {
        return b.objectProperty(
          b.identifier(key),
          //@ts-expect-error recast type issues
          buildMethodArgument(value),
        );
      });

      return b.objectExpression(properties);
    }
    case "property_access":
      if (!arg.target || !arg.property) {
        throw new Error("Property access requires target and property");
      }

      return b.memberExpression(
        b.identifier(arg.target),
        b.identifier(arg.property),
      );
    case "logical_expression": {
      if (!arg.operator || !arg.left || !arg.right) {
        throw new Error(
          "Logical expression requires operator, left and right operands",
        );
      }

      return b.logicalExpression(
        arg.operator,
        //@ts-expect-error recast type issues
        buildMethodArgument(arg.left),
        buildMethodArgument(arg.right),
      );
    }
    default:
      throw new Error(`Unsupported argument type: ${arg.type}`);
  }
};
