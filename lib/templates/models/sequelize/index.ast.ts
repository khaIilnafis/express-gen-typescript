/**
 * AST Template for models/sequelize/index.ts
 * This file is processed by the AST template processor and generates the Sequelize models index file
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
  dialect?: string;
  databaseName?: string;
  [key: string]: any;
}

/**
 * Generates the Sequelize models index AST with provided options
 * @param options Template options
 * @returns AST for models/sequelize/index.ts file
 */
export default function generateSequelizeModelsIndexAST(options: TemplateOptions = {}) {
  // Get dialect from options or use default
  const dialect = options.dialect || 'postgres';
  
  // Get database name from options or use default
  const databaseName = options.databaseName || 'database';
  
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("Example"))],
      b.stringLiteral("./example")
    )
  ];
  
  const exportModels = b.exportNamedDeclaration(
    null,
    [createExportSpecifier(
      b.identifier("Example"), 
      b.identifier("Example")
    )]
  );

  
  // Build the AST program
  const program = b.program([
    ...imports,
    exportModels,
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