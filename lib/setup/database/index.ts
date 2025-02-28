import { LOGS, DATABASE } from "../../constants/index.js";
import { setupDatabaseWithHelper } from "./database-setup-helper.js";
import { GeneratorOptions } from "../../utils/types.js";

/**
 * Set up selected database type
 */
export async function setupDatabase(
  options: GeneratorOptions
): Promise<void> {
  const { database } = options;

  // Log setup message
  console.log(LOGS.SETUP.DATABASE(database!));

  // Skip if no database or none was selected
  if (!database || database === DATABASE.TYPES.NONE) {
    return;
  }

  // Use the database setup helper for implementation
  await setupDatabaseWithHelper(options);
}

export default setupDatabase;
