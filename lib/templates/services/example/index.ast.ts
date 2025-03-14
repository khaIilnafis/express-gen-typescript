/**
 * AST Template for services/example/index.ts
 * This file is processed by the AST template processor and generates the services example index file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/index.js";
import { SERVICES_PRESET } from "../../../presets/index.js";
import { astConfig } from "../../../utils/builders/builder-config.js";

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
  const imports = astConfig.generateImports(SERVICES_PRESET.MODEL.imports);

  // Create the findOneExample function
  const findOneExampleParams = [b.identifier("exampleId")];

  // Add TypeScript type annotation
  findOneExampleParams[0].typeAnnotation = b.tsTypeAnnotation(
    b.tsNumberKeyword(),
  );

  // We need to build the return statement with await manually since it's not easily
  // represented in the IR structure
  const returnStatement = b.returnStatement(
    b.awaitExpression(
      b.callExpression(
        b.memberExpression(b.identifier("Example"), b.identifier("findOne")),
        [
          b.objectExpression([
            b.objectProperty(
              b.identifier("exampleId"),
              b.identifier("exampleId"),
            ),
          ]),
        ],
      ),
    ),
  );

  // Create the function body
  const functionBody = b.blockStatement([returnStatement]);

  // Build the findOneExample function
  const findOneExampleFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("findOneExample"),
      findOneExampleParams,
      functionBody,
      true, // async
    ),
    [],
  );

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
