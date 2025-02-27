/**
 * Template models constants
 * Contains constants for model template file paths
 */

/**
 * Type definition for mongoose model templates
 */
export interface MongooseModelTemplates {
  EXAMPLE: string;
//   EXAMPLE_AST: string;
}

/**
 * Type definition for sequelize model templates
 */
export interface SequelizeModelTemplates {
  EXAMPLE: string;
  INDEX: string;
}

/**
 * Type definition for typeorm model templates
 */
export interface TypeormModelTemplates {
  EXAMPLE: string;
}

/**
 * Type definition for model templates
 */
export interface ModelTemplates {
  MONGOOSE: MongooseModelTemplates;
  SEQUELIZE: SequelizeModelTemplates;
  TYPEORM: TypeormModelTemplates;
}

/**
 * Template models constants
 * Defines file paths for model templates
 */
export const MODELS = Object.freeze({
  MONGOOSE: {
    EXAMPLE: "models/mongoose/Example.ast.ts",
    // EXAMPLE_AST: "models/mongoose/Example.ast.ts",
  },
  SEQUELIZE: {
    EXAMPLE: "models/sequelize/Example.ast.ts",
    INDEX: "models/sequelize/index.ast.ts",
  },
  TYPEORM: {
    EXAMPLE: "models/typeorm/Example.entity.ast.ts",
  },
} as const) satisfies ModelTemplates; 