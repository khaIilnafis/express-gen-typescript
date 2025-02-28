 /**
 * Database logs constants
 * Contains message strings related to database operations
 */

/**
 * Type definition for database connection logs
 */
export interface DatabaseConnectionLogs {
	MONGOOSE: string;
	PRISMA: string;
	TYPEORM: string;
	SEQUELIZE: string;
  }
  
  /**
   * Type definition for database logs
   */
  export interface DatabaseLogs {
	CONNECTION_SUCCESS: DatabaseConnectionLogs;
  }

      /**
 * Application log constants
 */
export const DATABASE_LOGS = Object.freeze({
	CONNECTION_SUCCESS: {
		MONGOOSE: "MongoDB connected successfully.",
		PRISMA: "Prisma Client initialized successfully.",
		TYPEORM: "TypeORM connected successfully.",
		SEQUELIZE: "Sequelize connected successfully.",
	  }
});