import * as recast from "recast";
import { MethodDefinitionIR, MethodArgumentIR } from "../../types/index.js";
import { buildExpression } from "./expressions.js";
import { buildParameters } from "./params.js";
import { FunctionExpressionIR } from "../../types/config.js";
// import { TemplateLiteralIR } from "../../types/config.js";

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
export function buildMethodArgument(
  arg: MethodArgumentIR,
): recast.types.namedTypes.Expression {
  if (!arg) {
    return b.nullLiteral();
  }

  // Handle different argument types
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

    case "property_access":
      return b.memberExpression(
        b.identifier(arg.target as string),
        b.identifier(arg.property as string),
      );

    case "function_call":
      if (arg.functionExpression) {
        // Handle function expressions (e.g., arrow functions)
        return buildFunctionExpression(arg.functionExpression);
      } else if (arg.target && arg.property) {
        // Handle method calls (e.g., object.method())
        return b.callExpression(
          b.memberExpression(
            b.identifier(arg.target),
            b.identifier(arg.property),
          ),
          //@ts-expect-error recast type issues
          (arg.arguments || []).map(buildMethodArgument),
        );
      } else {
        // Handle direct function calls (e.g., func())
        return b.callExpression(
          b.identifier(arg.value as string),
          //@ts-expect-error recast type issues
          (arg.arguments || []).map(buildMethodArgument),
        );
      }

    case "constructor_call":
      return b.newExpression(
        b.identifier(arg.value as string),
        //@ts-expect-error recast type issues
        (arg.arguments || []).map(buildMethodArgument),
      );

    case "object": {
      const properties = [];

      if (arg.properties) {
        for (const key in arg.properties) {
          properties.push(
            b.objectProperty(
              b.identifier(key),
              //@ts-expect-error recast type issues
              buildMethodArgument(arg.properties[key]),
            ),
          );
        }
      }

      return b.objectExpression(properties);
    }
    case "logical_expression":
      if (!arg.left || !arg.right || !arg.operator) {
        throw new Error("Logical expression missing left, right, or operator");
      }

      // Only allow || and && for logical expressions
      if (arg.operator !== "||" && arg.operator !== "&&") {
        throw new Error(`Invalid logical operator: ${arg.operator}`);
      }

      return b.logicalExpression(
        arg.operator,
        //@ts-expect-error recast type issues
        buildMethodArgument(arg.left),
        buildMethodArgument(arg.right),
      );

    case "binary_expression": {
      if (!arg.left || !arg.right || !arg.operator) {
        throw new Error("Binary expression missing left, right, or operator");
      }

      // Ensure operator is valid for binary expressions
      const validBinaryOps = [
        "+",
        "-",
        "*",
        "/",
        "===",
        "!==",
        "==",
        "!=",
        ">",
        "<",
        ">=",
        "<=",
      ];
      if (!validBinaryOps.includes(arg.operator)) {
        throw new Error(`Invalid binary operator: ${arg.operator}`);
      }

      return b.binaryExpression(
        //@ts-expect-error recast type issues
        arg.operator,
        buildMethodArgument(arg.left),
        buildMethodArgument(arg.right),
      );
    }
    case "unary_expression": {
      if (!arg.arguments?.[0] || !arg.unaryOperator) {
        throw new Error("Unary expression missing argument or operator");
      }

      // Validate unary operators
      const validUnaryOps = ["typeof", "!", "+", "-", "~"];
      if (!validUnaryOps.includes(arg.unaryOperator)) {
        throw new Error(`Invalid unary operator: ${arg.unaryOperator}`);
      }

      return b.unaryExpression(
        arg.unaryOperator,
        //@ts-expect-error recast type issues
        buildMethodArgument(arg.arguments[0]),
        // The third argument is a boolean indicating if the operator is prefix (true) or postfix (false)
        true,
      );
    }
    case "template_literal": {
      // Use optional chaining and provide defaults
      const quasis = arg.quasis || [];
      const expressions = arg.expressions || [];

      if (quasis.length === 0) {
        throw new Error("Template literal must have at least one quasi part");
      }

      // Create template elements
      const quasisElements = quasis.map((quasi, i) =>
        b.templateElement(
          {
            raw: quasi.text,
            cooked: quasi.text,
          },
          i === quasis.length - 1, // true for last element
        ),
      );

      // Process expressions
      const expressionElements = expressions.map((expr) =>
        buildMethodArgument(expr),
      );

      //@ts-expect-error recast type issues
      return b.templateLiteral(quasisElements, expressionElements);
    }
    case "conditional_expression": {
      if (!arg.test || !arg.consequent || !arg.alternate) {
        throw new Error(
          "Conditional expression missing test, consequent, or alternate",
        );
      }

      // Single @ts-expect-error for the whole expression
      return b.conditionalExpression(
        //@ts-expect-error recast type issues
        buildMethodArgument(arg.test),
        buildMethodArgument(arg.consequent),
        buildMethodArgument(arg.alternate),
      );
    }
    default:
      throw new Error(`Unsupported argument type: ${arg.type}`);
  }
}

// Helper function to build function expressions (arrow functions)
function buildFunctionExpression(
  funcExpr: FunctionExpressionIR,
): recast.types.namedTypes.Expression {
  const params = (funcExpr.parameters || []).map((param) => {
    const identifier = b.identifier(param.name);

    // Add type annotation if available
    if (param.type) {
      identifier.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier(param.type)),
      );
    }

    return identifier;
  });

  const bodyStatements = (funcExpr.body || []).map((expr) => {
    // Handle different types of statements in the function body
    if (expr.expressionType === "return") {
      return b.returnStatement(
        //@ts-expect-error recast type issues
        expr.arguments && expr.arguments.length > 0
          ? buildMethodArgument(expr.arguments[0])
          : null,
      );
    } else {
      // Default to buildExpression for other statement types
      // Note: This assumes buildExpression is imported or available in this scope
      return buildExpression(expr);
    }
  });

  // Create block statement for the function body
  //@ts-expect-error recast type issues
  const bodyBlock = b.blockStatement(bodyStatements);

  // Create and return the appropriate function expression
  if (funcExpr.type === "arrow_function") {
    return b.arrowFunctionExpression(params, bodyBlock);
  } else {
    return b.functionExpression(null, params, bodyBlock);
  }
}
