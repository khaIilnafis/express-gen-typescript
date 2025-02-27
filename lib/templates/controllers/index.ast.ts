/**
 * AST Template for controllers/index.ts
 * This file is processed by the AST template processor and generates the controllers index file
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Helper function to create a properly configured export specifier
 * @param local - Local identifier
 * @param exported - Exported identifier
 * @returns Properly configured export specifier
 */
function createExportSpecifier(local: any, exported: any): any {
  // Use the .from() method to properly set all required properties
  return b.exportSpecifier.from({
    local: local,
    exported: exported
  });
}

/**
 * Template options interface
 */
export interface TemplateOptions {
  [key: string]: any;
}

/**
 * Generates the controllers index AST with provided options
 * @param options Template options
 * @returns AST for controllers/index.ts file
 */
export default function generateControllersIndexAST(options: TemplateOptions = {}) {
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importSpecifier(b.identifier("ExampleController"))],
      b.stringLiteral("./example")
    )
  ];

  // Build the exports section
  const exports = [
    b.exportNamedDeclaration(
      null,
      [createExportSpecifier(
        b.identifier("ExampleController"), 
        b.identifier("ExampleController")
      )]
    )
  ];

  // Build the AST program
  const program = b.program([
    ...imports,
    ...exports
  ]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.print(ast, { parser: tsParser }).code;
} 