import * as recast from "recast";
import { MethodExpressionIR } from "../../types/index.js";
import { buildMethodArgument } from "./method.js";

const b = recast.types.builders;

export const buildExpression = (
  expr: MethodExpressionIR,
): recast.types.namedTypes.ExpressionStatement => {
  // For assignment expressions (this.property = value)
  if (expr.method === "=") {
    const target = b.memberExpression(
      b.identifier(expr.target.object),
      b.identifier(expr.target.property),
    );

    // Build the right side of the assignment
    const value = buildMethodArgument(expr.arguments[0]);

    return b.expressionStatement(
      //@ts-expect-error recast type issues
      b.assignmentExpression("=", target, value),
    );
  }
  // For method calls (this.app.use(...))
  else {
    // Build the target (e.g., this.app)
    const target = b.memberExpression(
      b.identifier(expr.target.object),
      b.identifier(expr.target.property),
    );

    // Build the method call (e.g., this.app.use)
    const methodCall =
      expr.method === "call"
        ? target
        : b.memberExpression(target, b.identifier(expr.method));

    // Build the arguments
    const args = expr.arguments.map((arg) => buildMethodArgument(arg));

    // Build the full expression (e.g., this.app.use(helmet()))
    return b.expressionStatement(
      //@ts-expect-error recast type issues
      b.callExpression(methodCall, args),
    );
  }
};
