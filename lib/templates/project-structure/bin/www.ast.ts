/**
 * AST Template for bin/www.ts
 * This file is processed by the AST template processor and generates the entry point script for the Express application
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/setup.js";
import { BIN_PRESET } from "../../../presets/index.js";
import { astConfig } from "../../../utils/builders/builder-config.js";
import { buildExpression } from "../../../utils/builders/expressions.js";

const b = recast.types.builders;

/**
 * Generates the bin/www AST with provided options
 * @param options Template options
 * @returns AST for bin/www.ts file
 */
export default function generateBinWwwAST(_options: GeneratorOptions) {
  // Add shebang
  const shebang = b.expressionStatement(b.literal("#!/usr/bin/env ts-node"));
  shebang.comments = [{ type: "CommentLine", value: "!", leading: true }];

  // Build the imports section using the preset configuration
  const imports = astConfig.generateImports(BIN_PRESET.IMPORTS);

  // Create normalizePort function as a standalone function
  const normalizePortFunction = astConfig.generateFunction(
    BIN_PRESET.NORMALIZE_PORT,
  );
  normalizePortFunction.comments = [
    b.commentBlock(BIN_PRESET.COMMENTS.NORMALIZE_PORT, true, false),
  ];

  // Create the port declaration statement
  const portDeclarationExpr = buildExpression(BIN_PRESET.PORT_DECLARATION);
  portDeclarationExpr.comments = [
    b.commentBlock(BIN_PRESET.COMMENTS.PORT_DECLARATION, true, false),
  ];

  // Create the server declaration statement
  const serverDeclarationExpr = buildExpression(BIN_PRESET.SERVER_DECLARATION);
  serverDeclarationExpr.comments = [
    b.commentBlock(BIN_PRESET.COMMENTS.SERVER_DECLARATION, true, false),
  ];

  // Create the listen statement
  const listenExpr = buildExpression(BIN_PRESET.LISTEN_STATEMENT);
  listenExpr.comments = [
    b.commentBlock(BIN_PRESET.COMMENTS.LISTEN_STATEMENT, true, false),
  ];

  // Build the AST program
  const program = b.program([
    shebang,
    // @ts-expect-error Recast type issues with Statement types
    ...imports,
    // @ts-expect-error Recast type issues with Statement types
    normalizePortFunction,
    // @ts-expect-error Recast type issues
    portDeclarationExpr,
    // @ts-expect-error Recast type issues
    serverDeclarationExpr,
    // @ts-expect-error Recast type issues
    listenExpr,
  ]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
