import * as recast from "recast";
import {
  ConstructorBuilderFn,
  ConstructorDefinitionIR,
} from "../../types/index.js";
import { buildExpression } from "./expressions.js";
import { buildParameters } from "./params.js";

const b = recast.types.builders;

export const buildConstructor: ConstructorBuilderFn = (
  constructorDef: ConstructorDefinitionIR,
): recast.types.namedTypes.MethodDefinition => {
  // Create constructor parameters
  const constructorParams = buildParameters(constructorDef.parameters);
  // Create method body statements
  const bodyStatements: recast.types.namedTypes.Statement[] =
    constructorDef.expressions.map((expr) => buildExpression(expr));

  // Create constructor method
  const constructorMethod = b.methodDefinition(
    "constructor",
    b.identifier("constructor"),
    b.functionExpression(
      null,
      //@ts-expect-error recast type issues
      constructorParams,
      //@ts-expect-error recast type issues
      b.blockStatement(bodyStatements),
    ),
  );

  return constructorMethod;
};
