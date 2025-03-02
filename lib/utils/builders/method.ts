import * as recast from "recast";
import { FunctionIR, MethodIR, ParameterIR } from "../../types/index.js";
const b = recast.types.builders;

/**
 * Builder for a single parameter.
 * Creates an Identifier AST node with an optional type annotation.
 */
export const buildParameter = (
  param: ParameterIR,
): recast.types.namedTypes.Identifier => {
  const identifier = b.identifier(param.name);

  // If a type is specified, attach a TypeScript type annotation.
  if (param.type) {
    // Here we assume a simple type reference. For more complex types, you may want to extend this.
    identifier.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier(param.type)),
    );
  }
  return identifier;
};

/**
 * Builder for a function.
 * Converts the IR into a function declaration AST node.
 */
export const buildFunction = (
  ir: FunctionIR,
): recast.types.namedTypes.FunctionDeclaration => {
  // Build each parameter using the parameter builder.
  const params = ir.parameters.map(buildParameter);

  // Create the function body as a block statement.
  const body = b.blockStatement([]);

  // Create a function declaration.
  const funcDeclaration = b.functionDeclaration(
    b.identifier(ir.name),
    params,
    body,
  );

  // Attach a return type annotation if provided.
  if (ir.returnType) {
    funcDeclaration.returnType = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier(ir.returnType)),
    );
  }

  return funcDeclaration;
};

export const createMethod = (methodConfig: MethodIR) => {
  const genericMethod = b.methodDefinition(
    "method",
    b.identifier(methodConfig.name),
    b.functionExpression(
      methodConfig.identifier,
      methodConfig.params,
      methodConfig.body,
      methodConfig.generator,
    ),
  );
  // genericMethod.comments = [
  // 	b.commentBlock(methodConfig.comment.value, methodConfig.comment.trailing)
  //   ];
  return genericMethod;
};
