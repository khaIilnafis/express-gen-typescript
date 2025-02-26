/**
 * Database messages constants
 * Contains message strings related to database operations
 */

/**
 * Type definition for database connection messages
 */
export interface DatabaseConnectionMessages {
  MONGOOSE: string;
  PRISMA: string;
  TYPEORM: string;
  SEQUELIZE: string;
}

/**
 * Type definition for database messages
 */
export interface DatabaseMessages {
  CONNECTION_SUCCESS: DatabaseConnectionMessages;
}

/**
 * Database message constants
 * Defines messages for database operations (connection, errors, etc.)
 */
export const MESSAGES = Object.freeze({
  CONNECTION_SUCCESS: {
    MONGOOSE: "MongoDB connected successfully.",
    PRISMA: "Prisma Client initialized successfully.",
    TYPEORM: "TypeORM connected successfully.",
    SEQUELIZE: "Sequelize connected successfully.",
  },
} as const) satisfies DatabaseMessages; 