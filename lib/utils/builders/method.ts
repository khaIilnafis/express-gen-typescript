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
  if (methodDef.isStatic) {
    method.static = true;
  }
  if (methodDef.isAsync) {
    method.value.async = true;
  }

  return method;
};
// Helper function to build method arguments
export const buildMethodArgument = (
  arg: MethodArgumentIR,
): recast.types.namedTypes.Expression => {
  switch (arg.type) {
    case "literal":
      if (arg.isTemplate && arg.templateParts) {
        const elements = [];
        const expressions = [];

        // Create template elements from parts
        for (let i = 0; i < arg.templateParts.length; i++) {
          const part = arg.templateParts[i];
          elements.push(
            b.templateElement(
              { raw: part.text, cooked: part.text },
              i === arg.templateParts.length - 1, // is tail?
            ),
          );

          // Add expression if this part has an expression and there's a corresponding templateExpression
          if (
            part.isExpression &&
            arg.templateExpressions &&
            i < arg.templateExpressions.length
          ) {
            expressions.push(buildMethodArgument(arg.templateExpressions[i]));
          }
        }
        //@ts-expect-error recast type issues
        return b.templateLiteral(elements, expressions);
      }
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
      if (!arg.value) {
        console.warn("Identifier with no value", arg);
        return b.identifier("undefinedIdentifier"); // Provide a default to prevent crashes
      }
      return b.identifier(arg.value as string);

    case "constructor_call":
      return b.newExpression(
        b.identifier(arg.value as string),
        //@ts-expect-error recast type issues
        (arg.arguments || []).map((subArg) => buildMethodArgument(subArg)),
      );
    case "function_call":
      // Check for functionExpression and handle it specially
      if (arg.functionExpression) {
        // Build an arrow function or function expression based on the functionExpression
        const params = (arg.functionExpression.parameters || []).map(
          (param) => {
            const identifier = b.identifier(param.name || "param");

            // Add type annotation if available
            if (param.type) {
              identifier.typeAnnotation = b.tsTypeAnnotation(
                b.tsTypeReference(b.identifier(param.type)),
              );
            }

            return identifier;
          },
        );

        const bodyStatements = (arg.functionExpression.body || []).map((expr) =>
          buildExpression(expr),
        );

        if (arg.functionExpression.type === "arrow_function") {
          return b.arrowFunctionExpression(
            params,
            //@ts-expect-error recast type issues
            b.blockStatement(bodyStatements),
          );
        } else {
          return b.functionExpression(
            null,
            params,
            //@ts-expect-error recast type issues
            b.blockStatement(bodyStatements),
          );
        }
      }

      // Handle normal function calls (existing code with safety checks)
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
      } else if (arg.value) {
        // For simple function calls like helmet(), but check if value exists
        return b.callExpression(
          b.identifier(arg.value as string),
          //@ts-expect-error recast type issues
          (arg.arguments || []).map((subArg) => buildMethodArgument(subArg)),
        );
      } else {
        // Fallback if no valid function identifier is found
        console.warn("Function call with no valid identifier found", arg);
        return b.identifier("undefinedFunction"); // Provide a default to prevent crashes
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
        console.warn("Property access with missing target or property", arg);
        return b.identifier("undefinedProperty"); // Provide a default to prevent crashes
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
