import { DATABASE, COMMON } from "../../constants/index.js";
import { setupDatabaseWithHelper } from "../../utils/database-setup-helper.js";

/**
 * Options for database setup
 */
export interface DatabaseSetupOptions {
  /**
   * Destination directory for project
   */
  destination: string;

  /**
   * Database type to set up
   */
  database: string;

  /**
   * Database name to use
   */
  databaseName?: string;

  /**
   * Additional options for database setup
   */
  [key: string]: any;
}

/**
 * Set up selected database type
 */
export async function setupDatabase(
  options: DatabaseSetupOptions
): Promise<void> {
  const { destination, database } = options;

  // Log setup message
  console.log(COMMON.MESSAGES.SETUP.DATABASE(database));

  // Skip if no database or none was selected
  if (!database || database === DATABASE.TYPES.NONE) {
    return;
  }

  // Use the database setup helper for implementation
  await setupDatabaseWithHelper(destination, database, {
    ...options,
  });
}

export default setupDatabase;
