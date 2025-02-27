/**
 * Template database constants
 * Contains constants for database template file paths
 */

/**
 * Type definition for Sequelize templates
 */
export interface SequelizeTemplates {
  CONFIG: string;
//   CONFIG_AST: string;
  MODEL_INDEX: string;
//   MODEL_INDEX_AST: string;
  EXAMPLE_MODEL: string;
//   EXAMPLE_MODEL_AST: string;
  INIT: string;
//   INIT_AST: string;
}

/**
 * Type definition for TypeORM templates
 */
export interface TypeORMTemplates {
  CONFIG: string;
//   CONFIG_AST: string;
  EXAMPLE_MODEL: string;
//   EXAMPLE_MODEL_AST: string;
  MODEL_INDEX: string;
  INIT: string;
//   INIT_AST: string;
}

/**
 * Type definition for Prisma templates
 */
export interface PrismaTemplates {
  EXAMPLE_MODEL: string;
  CONFIG: string;
//   CONFIG_AST: string;
  INIT: string;
//   INIT_AST: string;
}

/**
 * Type definition for Mongoose templates
 */
export interface MongooseTemplates {
  CONFIG: string;
//   CONFIG_AST: string;
  EXAMPLE_MODEL: string;
//   EXAMPLE_MODEL_AST: string;
  INIT: string;
//   INIT_AST: string;
}

/**
 * Type definition for database templates
 */
export interface TemplateDatabase {
  SEQUELIZE: SequelizeTemplates;
  TYPEORM: TypeORMTemplates;
  PRISMA: PrismaTemplates;
  MONGOOSE: MongooseTemplates;
}

/**
 * Template database constants
 * Defines file paths for database templates
 */
export const DATABASE = Object.freeze({
  SEQUELIZE: {
    CONFIG: "database/sequelize/index.ast.ts",
    // CONFIG_AST: "database/sequelize/index.ast.ts",
    MODEL_INDEX: "models/sequelize/index.ast.ts",
    // MODEL_INDEX_AST: "models/sequelize/index.ast.ts",
    EXAMPLE_MODEL: "models/sequelize/Example.ast.ts",
    // EXAMPLE_MODEL_AST: "models/sequelize/Example.ast.ts",
    INIT: "database/sequelize/sequelize-method.ast.ts",
    // INIT_AST: "database/sequelize/sequelize-method.ast.ts",
  },
  TYPEORM: {
    CONFIG: "database/typeorm/index.ast.ts",
    // CONFIG_AST: "database/typeorm/index.ast.ts",
    EXAMPLE_MODEL: "models/typeorm/Example.entity.ast.ts",
    // EXAMPLE_MODEL_AST: "models/typeorm/Example.entity.ast.ts",
    MODEL_INDEX: "models/typeorm/index.ts",
    INIT: "database/typeorm/typeorm-method.ast.ts",
    // INIT_AST: "database/typeorm/typeorm-method.ast.ts",
  },
  PRISMA: {
    EXAMPLE_MODEL: "models/prisma/schema.prisma",
    CONFIG: "database/prisma/index.ast.ts",
    // CONFIG_AST: "database/prisma/index.ast.ts",
    INIT: "database/prisma/prisma-method.ast.ts",
    // INIT_AST: "database/prisma/prisma-method.ast.ts",
  },
  MONGOOSE: {
    CONFIG: "database/mongoose/index.ast.ts",
    // CONFIG_AST: "database/mongoose/index.ast.ts",
    EXAMPLE_MODEL: "models/mongoose/Example.ast.ts",
    // EXAMPLE_MODEL_AST: "models/mongoose/Example.ast.ts",
    INIT: "database/mongoose/mongoose-method.ast.ts",
    // INIT_AST: "database/mongoose/mongoose-method.ast.ts",
  },
} as const) satisfies TemplateDatabase; 