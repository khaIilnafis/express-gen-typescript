/**
 * AST Template for TypeORM database method
 * This file is processed by the AST template processor and generates the method for initializing TypeORM database
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  [key: string]: any;
}

/**
 * Generates the TypeORM database method AST
 * @param options Template options
 * @returns AST for TypeORM database method
 */
export default function generateTypeORMMethodAST(options: TemplateOptions = {}) {
  // Create the connectToDatabase method
  const methodBody = b.blockStatement([
    // try {
    b.tryStatement(
      b.blockStatement([
        // await initializeDatabase();
        b.expressionStatement(
          b.awaitExpression(
            b.callExpression(
              b.identifier("initializeDatabase"),
              []
            )
          )
        ),
        // console.log('Database connection established successfully.');
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(
              b.identifier("console"),
              b.identifier("log")
            ),
            [b.stringLiteral("TypeORM connection established successfully.")]
          )
        )
      ]),
      // catch (error) {
      b.catchClause(
        b.identifier("error"),
        null, // No guard expression
        b.blockStatement([
          // console.error('Database connection error:', error);
          b.expressionStatement(
            b.callExpression(
              b.memberExpression(
                b.identifier("console"),
                b.identifier("error")
              ),
              [
                b.stringLiteral("Database connection error:"),
                b.identifier("error")
              ]
            )
          ),
          // Comment: // process.exit(1);
          b.emptyStatement()
        ])
      )
    )
  ]);

  // Add method node with async and private modifiers
  const connectToDatabaseMethod = b.classMethod(
    "method",
    b.identifier("connectToDatabase"),
    [],
    methodBody,
    false,  // not computed
    true    // is private
  );

  // Add async modifier
  connectToDatabaseMethod.async = true;

  // Add return type annotation
  connectToDatabaseMethod.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.tsQualifiedName(b.identifier("Promise"), b.identifier("void"))
    )
  );

  // Return just the method body as a string
  return "  " + recast.print(connectToDatabaseMethod).code;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: string): string {
  return ast;
} 