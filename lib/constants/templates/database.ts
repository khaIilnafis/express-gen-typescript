/**
 * Template database constants
 * Contains constants for database template file paths
 */

/**
 * Type definition for Sequelize templates
 */
export interface SequelizeTemplates {
  CONFIG: string;
  MODEL_INDEX: string;
  EXAMPLE_MODEL: string;
  INIT: string;
}

/**
 * Type definition for TypeORM templates
 */
export interface TypeORMTemplates {
  CONFIG: string;
  EXAMPLE_MODEL: string;
  INIT: string;
}

/**
 * Type definition for Prisma templates
 */
export interface PrismaTemplates {
  EXAMPLE_MODEL: string;
  CONFIG: string;
  INIT: string;
}

/**
 * Type definition for Mongoose templates
 */
export interface MongooseTemplates {
  CONFIG: string;
  EXAMPLE_MODEL: string;
  INIT: string;
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
    CONFIG: "database/sequelize/index.ts",
    MODEL_INDEX: "models/sequelize/index.ts",
    EXAMPLE_MODEL: "models/sequelize/Example.ts",
    INIT: "database/sequelize/sequelize-method.ts",
  },
  TYPEORM: {
    CONFIG: "database/typeorm/index.ts",
    EXAMPLE_MODEL: "models/typeorm/Example.entity.ts",
    INIT: "database/typeorm/typeorm-method.ts",
  },
  PRISMA: {
    EXAMPLE_MODEL: "models/prisma/schema.prisma",
    CONFIG: "database/prisma/index.ts",
    INIT: "database/prisma/prisma-method.ts",
  },
  MONGOOSE: {
    CONFIG: "database/mongoose/index.ts",
    EXAMPLE_MODEL: "models/mongoose/Example.ts",
    INIT: "database/mongoose/mongoose-method.ts",
  },
} as const) satisfies TemplateDatabase; 