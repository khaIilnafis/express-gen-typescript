/**
 * AST Template for services/example/index.ts
 * This file is processed by the AST template processor and generates the services example index file
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  database?: string;
  [key: string]: any;
}

/**
 * Generates the services example index AST with provided options
 * @param options Template options
 * @returns AST for services/example/index.ts file
 */
export default function generateServicesExampleIndexAST(options: TemplateOptions = {}) {
  // Provide defaults for options
  const opts = {
    database: options.database || "none",
    ...options
  };

  // Determine which model to import based on the database option
  let importPath = "";
  switch (opts.database) {
    case "mongoose":
      importPath = "../../models/mongoose/Example";
      break;
    case "sequelize":
      importPath = "../../models/sequelize/Example";
      break;
    case "typeorm":
      importPath = "../../models/typeorm/Example.entity";
      break;
    default:
      importPath = "../../models/sequelize/Example";
  }

  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("Example"))],
      b.stringLiteral(importPath)
    )
  ];

  // Build the findOneExample function
  const findOneExampleFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("findOneExample"),
      [
        b.identifier("exampleId")
      ],
      b.blockStatement([
        b.returnStatement(
          b.awaitExpression(
            b.callExpression(
              b.memberExpression(
                b.identifier("Example"),
                b.identifier("findOne")
              ),
              [
                b.objectExpression([
                  b.property(
                    "init",
                    b.identifier("exampleId"),
                    b.identifier("exampleId")
                  )
                ])
              ]
            )
          )
        )
      ]),
      true // async
    ),
    []
  );

  // Add TypeScript type annotations
  const findOneExampleFn = findOneExampleFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  if (findOneExampleFn.params[0]) {
    (findOneExampleFn.params[0] as any).typeAnnotation = b.tsTypeAnnotation(
      b.tsNumberKeyword()
    );
  }

  // Build the AST program
  const program = b.program([
    ...imports,
    findOneExampleFunction
  ]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
} 