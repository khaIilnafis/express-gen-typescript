/**
 * Database logs constants
 * Contains message strings related to database operations
 */

/**
 * Application log constants
 */
export const DATABASE_LOGS = Object.freeze({
  CONNECTION_SUCCESS: {
    MONGOOSE: "MongoDB connected successfully.",
    PRISMA: "Prisma Client initialized successfully.",
    TYPEORM: "TypeORM connected successfully.",
    SEQUELIZE: "Sequelize connected successfully.",
  },
});
