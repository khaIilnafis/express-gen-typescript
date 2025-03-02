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
