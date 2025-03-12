/**
 * AST Template for services/example/index.ts
 * This file is processed by the AST template processor and generates the services example index file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/setup.js";
import { astConfig } from "../../../utils/builders/index.js";
import { servicesConfig } from "../../../presets/services.js";

const b = recast.types.builders;

/**
 * Generates the services example index AST with provided options
 * @param options Template options
 * @returns AST for services/example/index.ts file
 */
export default function generateServicesExampleIndexAST(
  _options: GeneratorOptions,
) {
  // Build the imports section
  const imports = astConfig.generateImports(servicesConfig.MODEL.imports);
  // Build the findOneExample function
  const findOneExampleFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("findOneExample"),
      [b.identifier("exampleId")],
      b.blockStatement([
        b.returnStatement(
          b.awaitExpression(
            b.callExpression(
              b.memberExpression(
                b.identifier("Example"),
                b.identifier("findOne"),
              ),
              [
                b.objectExpression([
                  b.property(
                    "init",
                    b.identifier("exampleId"),
                    b.identifier("exampleId"),
                  ),
                ]),
              ],
            ),
          ),
        ),
      ]),
      true, // async
    ),
    [],
  );

  // Add TypeScript type annotations
  const findOneExampleFn =
    findOneExampleFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  if (findOneExampleFn.params[0]) {
    //@ts-expect-error: recast type issues
    (findOneExampleFn.params[0] as unknown).typeAnnotation = b.tsTypeAnnotation(
      b.tsNumberKeyword(),
    );
  }

  // Build the AST program
  const program = b.program([...imports, findOneExampleFunction]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
