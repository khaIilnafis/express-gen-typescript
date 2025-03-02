/**
 * AST Template for Mongoose database method
 * This file is processed by the AST template processor and generates the method for initializing Mongoose database
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/setup.js";

const b = recast.types.builders;

/**
 * Generates the Mongoose database method AST
 * @param options Template options
 * @returns AST for Mongoose database method
 */
export default function generateMongooseMethodAST(options: GeneratorOptions) {
  const dbName = options.databaseName || "express_typescript_db";

  // Create the connectToDatabase method
  const methodBody = b.blockStatement([
    // try {
    b.tryStatement(
      b.blockStatement([
        // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dbname');
        b.expressionStatement(
          b.awaitExpression(
            b.callExpression(
              b.memberExpression(
                b.identifier("mongoose"),
                b.identifier("connect"),
              ),
              [
                b.logicalExpression(
                  "||",
                  b.memberExpression(
                    b.memberExpression(
                      b.identifier("process"),
                      b.identifier("env"),
                    ),
                    b.identifier("MONGODB_URI"),
                  ),
                  b.stringLiteral(`mongodb://localhost:27017/${dbName}`),
                ),
              ],
            ),
          ),
        ),
        // console.log('MongoDB connected successfully.');
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("console"), b.identifier("log")),
            [b.stringLiteral("MongoDB connected successfully.")],
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

  // Add async modifier
  connectToDatabaseMethod.async = true;

  // Add return type annotation
  connectToDatabaseMethod.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.tsQualifiedName(b.identifier("Promise"), b.identifier("void")),
    ),
  );

  // Return just the method body as a string
  return "  " + recast.prettyPrint(connectToDatabaseMethod).code;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
