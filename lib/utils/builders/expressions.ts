import * as recast from "recast";
import { MethodExpressionIR } from "../../types/index.js";
import { buildMethodArgument } from "./method.js";

const b = recast.types.builders;

export const buildExpression = (
  expr: MethodExpressionIR,
): recast.types.namedTypes.Statement => {
  // First handle case where there's no expressionType
  if (!expr.expressionType) {
    // Default to method_call if no expressionType is specified
    expr.expressionType = "method_call";
  }

  // Handle different expression types
  switch (expr.expressionType) {
    case "assignment":
      // Handle assignments: this.property = value
      return b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(
            b.identifier(expr.target.object),
            b.identifier(expr.target.property),
          ),
          //@ts-expect-error recast type issues
          buildMethodArgument(expr.arguments[0]),
        ),
      );

    case "method_call": {
      // Build the base target (e.g., this.app)
      const target = b.memberExpression(
        b.identifier(expr.target.object),
        b.identifier(expr.target.property),
      );

      // If method is missing or undefined or matches the property (like console.log.log),
      // call the property directly (like console.log())
      if (!expr.method || expr.method === expr.target.property) {
        return b.expressionStatement(
          b.callExpression(
            target,
            //@ts-expect-error recast type issues
            expr.arguments.map((arg) => buildMethodArgument(arg)),
          ),
        );
      }

      // If method is present and different from the property, call that method on the target
      // property (like this.app.use())
      return b.expressionStatement(
        b.callExpression(
          b.memberExpression(target, b.identifier(expr.method)),
          //@ts-expect-error recast type issues
          expr.arguments.map((arg) => buildMethodArgument(arg)),
        ),
      );
    }
    case "function_call":
      // Direct function calls, could be regular functions or constructors
      return b.expressionStatement(
        b.callExpression(
          b.identifier(expr.target.object), // In this case, target.object holds the function name
          //@ts-expect-error recast type issues
          expr.arguments.map((arg) => buildMethodArgument(arg)),
        ),
      );
    case "await": {
      // Create an await expression
      return b.expressionStatement(
        //@ts-expect-error recast type issues
        b.awaitExpression(buildMethodArgument(expr.arguments[0])),
      );
    }
    case "try_catch": {
      if (!expr.tryCatchBlock) {
        throw new Error("Missing tryCatchBlock for 'try_catch' expressionType");
      }

      const { tryBlock, catchParameter, catchBlock, finallyBlock } =
        expr.tryCatchBlock;

      // Build try block statements
      const tryStatements = tryBlock.map((expr) => buildExpression(expr));

      // Build catch block statements
      const catchStatements = catchBlock.map((expr) => buildExpression(expr));

      // Create catch clause
      const catchClause = b.catchClause(
        b.identifier(catchParameter),
        null, // No guard expression
        //@ts-expect-error recast type issues
        b.blockStatement(catchStatements),
      );

      // Build finally block if it exists
      const finallyBlockStatement = finallyBlock
        ? //@ts-expect-error recast type issues
          b.blockStatement(finallyBlock.map((expr) => buildExpression(expr)))
        : null;

      // Create try statement
      return b.tryStatement(
        //@ts-expect-error recast type issues
        b.blockStatement(tryStatements),
        catchClause,
        finallyBlockStatement,
      );
    }
    case "return": {
      const returnExpr = buildMethodArgument(
        expr.arguments[0],
      ) as recast.types.namedTypes.Expression;
      //@ts-expect-error recast type issues
      return b.returnStatement(expr.arguments.length > 0 ? returnExpr : null);
      //   return b.returnStatement(
      //     expr.arguments.length > 0
      //       ? buildMethodArgument(expr.arguments[0])
      //       : null,
      //   );
    }
    default: {
      // For backward compatibility - handle as method call with "=" special case
      if (expr.method === "=") {
        return b.expressionStatement(
          b.assignmentExpression(
            "=",
            b.memberExpression(
              b.identifier(expr.target.object),
              b.identifier(expr.target.property),
            ),
            //@ts-expect-error recast type issues
            buildMethodArgument(expr.arguments[0]),
          ),
        );
      }

      // Handle as a standard method call
      const methodTarget = b.memberExpression(
        b.identifier(expr.target.object),
        b.identifier(expr.target.property),
      );

      // Avoid duplicate calls like console.log.log()
      if (!expr.method || expr.method === expr.target.property) {
        return b.expressionStatement(
          b.callExpression(
            methodTarget,
            //@ts-expect-error recast type issues
            expr.arguments.map((arg) => buildMethodArgument(arg)),
          ),
        );
      }

      return b.expressionStatement(
        b.callExpression(
          b.memberExpression(methodTarget, b.identifier(expr.method || "call")),
          //@ts-expect-error recast type issues
          expr.arguments.map((arg) => buildMethodArgument(arg)),
        ),
      );
    }
  }
};
