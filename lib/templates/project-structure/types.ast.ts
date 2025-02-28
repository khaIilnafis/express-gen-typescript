/**
 * AST Template for types.d.ts
 * This file is processed by the AST template processor and generates the global type definitions
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';
import { GeneratorOptions } from '../../utils/types.js';

const b = recast.types.builders;
/**
 * Generates the types.d.ts AST with provided options
 * @param options Template options
 * @returns AST for types.d.ts file
 */
export default function generateTypeDefinitionsAST(options: GeneratorOptions) {
  // Create an array of comments to preserve in the output
  const topLevelComment = b.commentBlock("*\n * Global type definitions\n ", true, false);
  
  // Express namespace declaration
  const expressNamespace = b.tsModuleDeclaration(
    b.identifier("Express"),
    b.tsModuleBlock([
      // Request interface
      b.exportNamedDeclaration(
        b.tsInterfaceDeclaration(
          b.identifier("Request"),
          b.tsInterfaceBody([
            // Empty with comment
            b.tsPropertySignature(
              b.identifier("// Add custom properties to Express Request"),
              b.tsTypeAnnotation(b.tsAnyKeyword())
            )
          ])
        )
      ),
      // Response interface
      b.exportNamedDeclaration(
        b.tsInterfaceDeclaration(
          b.identifier("Response"),
          b.tsInterfaceBody([
            // Empty with comment
            b.tsPropertySignature(
              b.identifier("// Add custom properties to Express Response"),
              b.tsTypeAnnotation(b.tsAnyKeyword())
            )
          ])
        )
      )
    ])
  );
  
  // Make it a declaration
  (expressNamespace as any).declare = true;
  
  // Global namespace declaration
  const globalNamespace = b.tsModuleDeclaration(
    b.identifier("global"),
    b.tsModuleBlock([
      // NodeJS namespace
      b.tsModuleDeclaration(
        b.identifier("NodeJS"),
        b.tsModuleBlock([
          // ProcessEnv interface
          b.tsInterfaceDeclaration(
            b.identifier("ProcessEnv"),
            b.tsInterfaceBody([
              // NODE_ENV property
              b.tsPropertySignature(
                b.identifier("NODE_ENV"),
                b.tsTypeAnnotation(
                  b.tsUnionType([
                    b.tsLiteralType(b.stringLiteral("development")),
                    b.tsLiteralType(b.stringLiteral("production")),
                    b.tsLiteralType(b.stringLiteral("test"))
                  ])
                )
              ),
              // PORT property
              b.tsPropertySignature(
                b.identifier("PORT"),
                b.tsTypeAnnotation(b.tsStringKeyword())
              ),
              // Comment for other environment variables
              b.tsPropertySignature(
                b.identifier("// Add other environment variables used in your app"),
                b.tsTypeAnnotation(b.tsAnyKeyword())
              )
            ])
          )
        ])
      )
    ])
  );
  
  // Make it a declaration
  (globalNamespace as any).declare = true;
  
  // Empty export to ensure the file is treated as a module
  const emptyExport = b.exportNamedDeclaration(
    b.variableDeclaration("const", []),
    []
  );
  
  // Add a comment before the empty export
  const exportComment = b.commentLine(" This export is necessary to ensure this file is treated as a module");
  
  // Create the program
  const program = b.program([
    expressNamespace,
    globalNamespace,
    emptyExport
  ]);
  
  // Add the top-level comment to the program
  program.comments = [topLevelComment];
  
  // Add the export comment before the empty export
  (program.body[2] as any).comments = [exportComment];
  
  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.prettyPrint(ast, { 
    parser: tsParser,
    tabWidth: 2,
    quote: "single"
  }).code;
} 