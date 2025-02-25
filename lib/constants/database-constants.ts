/**
 * Database-related constants
 */

export const DATABASE_MESSAGES = Object.freeze({
  CONNECTION_SUCCESS: {
    MONGOOSE: "MongoDB connected successfully.",
    PRISMA: "Prisma Client initialized successfully.",
    TYPEORM: "TypeORM connected successfully.",
    SEQUELIZE: "Sequelize connected successfully.",
  },
});

export const DATABASE_PATHS = Object.freeze({
  MODELS: {
    TYPEORM: "dist/models/**/*.js",
    SEQUELIZE: "models",
  },
});

export const DATABASE_CONFIG = Object.freeze({
  DEFAULT_TYPE: "postgres",
  SYNCHRONIZE: {
    DEV: true,
    PROD: false,
  },
});
