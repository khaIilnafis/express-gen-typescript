/**
 * Type definition for database prerequisites
 */
export interface DatabasePrerequisites {
	MONGODB: string;
	POSTGRES: string;
	MYSQL: string;
  }

  /**
 * Constants for database prerequisites
 */
export const DATABASE_PREREQUISITES = Object.freeze({
	MONGODB: "- MongoDB",
	POSTGRES: "- PostgreSQL",
	MYSQL: "- MySQL/MariaDB",
  } as const) satisfies DatabasePrerequisites;