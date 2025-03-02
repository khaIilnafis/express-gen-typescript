import { LOGS } from "../constants/index.js";
import { setupDatabaseWithHelper } from "./database-setup-helper.js";
import { GeneratorOptions } from "../../types/index.js";
import { error } from "console";
/**
 * Set up selected database type
 */
export async function setupDatabase(options: GeneratorOptions): Promise<void> {
  const { database, dialect } = options;
  if (!dialect) {
    throw error;
  }
  // Log setup message
  console.log(LOGS.SETUP.DATABASE(dialect));

  // Skip if no database or none was selected
  if (!database) {
    return;
  }

  // Use the database setup helper for implementation
  await setupDatabaseWithHelper(options);
}

export default setupDatabase;
