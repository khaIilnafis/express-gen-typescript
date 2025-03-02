/**
 * AST Template for Sequelize database method
 * This file is processed by the AST template processor and generates the method for initializing Sequelize database
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { COMMENTS } from "../../constants/index.js";
import { IMPORTS } from "../../constants/server/index.js";
import { GeneratorOptions } from "../../../types/setup.js";

const b = recast.types.builders;

/**
 * Generates the Sequelize database method AST
 * @param options Template options
 * @returns AST for Sequelize database method
 */
export default function generateSequelizeMethodAST(_options: GeneratorOptions) {
  // Create the connectToDatabase method
  const methodBody = b.blockStatement([
    // try {
    b.tryStatement(
      b.blockStatement([
        // await initializeDatabase();
        b.expressionStatement(
          b.awaitExpression(
            b.callExpression(b.identifier(IMPORTS.DATABASE.INITIALIZE), []),
          ),
        ),
        // console.log('Database connection established successfully.');
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("console"), b.identifier("log")),
            [b.stringLiteral("Database connection established successfully.")],
          ),
        ),
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
                b.identifier("error"),
              ),
              [
                b.stringLiteral("Database connection error:"),
                b.identifier("error"),
              ],
            ),
          ),
          // Comment: // process.exit(1);
          b.emptyStatement(),
        ]),
      ),
    ),
  ]);

  // Add method node with async and private modifiers
  const connectToDatabaseMethod = b.classMethod(
    "method",
    b.identifier("connectToDatabase"),
    [],
    methodBody,
    false, // not computed
    true, // is private
  );
  connectToDatabaseMethod.comments = [
    b.commentBlock(COMMENTS.SERVER.CONNECT_DATABASE, true),
  ];
  // Add async modifier
  connectToDatabaseMethod.async = true;

  // Add return type annotation
  connectToDatabaseMethod.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([b.tsVoidKeyword()]),
    ),
  );

  // Return just the method body as a string
  return recast.prettyPrint(connectToDatabaseMethod, { tabWidth: 6 }).code;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
