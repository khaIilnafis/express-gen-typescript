/**
 * Database helper utilities
 */

import fs from "fs";
import path from "path";
import {
  PROJECT,
  DATABASE,
} from "../constants/index.js";

/**
 * Normalize a project name to a valid database name
 * @param projectName - The name of the project
 * @returns Normalized database name
 */
export function normalizeDatabaseName(projectName: string): string {
  return projectName.toLowerCase().replace(/[^a-z0-9]/g, "_");
}

/**
 * Get default database name based on project name or database type
 * @param projectName - The name of the project
 * @param dbType - The database type
 * @returns Normalized database name
 */
export function getDefaultDatabaseName(
  projectName: string,
  dbType: string
): string {
  // Normalize project name to valid database name
  const normalizedName = normalizeDatabaseName(projectName);

  // Return appropriate default name based on database type
  if (dbType === DATABASE.TYPES.MONGOOSE) {
    return normalizedName || DATABASE.DEFAULTS.MONGODB.DEFAULT_DB_NAME;
  } else if (
    dbType === DATABASE.TYPES.PRISMA ||
    dbType === DATABASE.TYPES.TYPEORM
  ) {
    return normalizedName || DATABASE.DEFAULTS.POSTGRES.DEFAULT_DB_NAME;
  } else if (dbType === DATABASE.TYPES.SEQUELIZE) {
    return normalizedName || DATABASE.DEFAULTS.MYSQL.DEFAULT_DB_NAME;
  }

  return normalizedName || "express_app";
}

/**
 * Generate connection string for the specified database type
 * @param dbType - Database type
 * @param dbName - Database name
 * @returns Connection string for the database
 */
export function getDatabaseConnectionString(
  dbType: string,
  dbName: string
): string {
  if (dbType === DATABASE.TYPES.MONGOOSE) {
    return DATABASE.DEFAULTS.MONGODB.URI(dbName);
  } else if (dbType === DATABASE.TYPES.PRISMA) {
    return DATABASE.DEFAULTS.POSTGRES.URI(dbName);
  }

  // Return null for databases that don't use simple connection strings
  return "";
}

/**
 * Get the appropriate dialect for a database type
 * @param dbType - Database type
 * @returns Appropriate dialect identifier
 */
export function getDatabaseDialect(dbType: string): string {
  if (dbType === DATABASE.TYPES.MONGOOSE) {
    return DATABASE.DIALECTS.MONGODB;
  } else if (
    dbType === DATABASE.TYPES.TYPEORM ||
    dbType === DATABASE.TYPES.PRISMA
  ) {
    return DATABASE.DIALECTS.POSTGRES;
  } else if (dbType === DATABASE.TYPES.SEQUELIZE) {
    return DATABASE.DIALECTS.MYSQL;
  }

  return "";
}

/**
 * Generate appropriate environment variables for database configuration
 * @param dbType - Database type
 * @param dbName - Database name
 * @returns Object containing environment variables
 */
export function getDatabaseEnvVars(
  dbType: string,
  dbName: string
): Record<string, string> {
  const envVars: Record<string, string> = {};

  if (dbType === DATABASE.TYPES.MONGOOSE) {
    envVars.MONGODB_URI = DATABASE.DEFAULTS.MONGODB.URI(dbName);
  } else if (dbType === DATABASE.TYPES.PRISMA) {
    envVars.DATABASE_URL = DATABASE.DEFAULTS.POSTGRES.URI(dbName);
  } else if (dbType === DATABASE.TYPES.TYPEORM) {
    const { HOST, PORT, USER, PASSWORD } = DATABASE.DEFAULTS.POSTGRES;
    envVars.DB_TYPE = DATABASE.DIALECTS.POSTGRES;
    envVars.DB_HOST = HOST;
    envVars.DB_PORT = PORT;
    envVars.DB_NAME = dbName;
    envVars.DB_USER = USER;
    envVars.DB_PASSWORD = PASSWORD;
  } else if (dbType === DATABASE.TYPES.SEQUELIZE) {
    const { HOST, PORT, USER, PASSWORD } = DATABASE.DEFAULTS.MYSQL;
    envVars.DB_HOST = HOST;
    envVars.DB_PORT = PORT;
    envVars.DB_NAME = dbName;
    envVars.DB_USER = USER;
    envVars.DB_PASSWORD = PASSWORD;
  }

  return envVars;
}

/**
 * Update server.ts file to include database initialization
 */
export function updateServerWithDatabaseInit(destination: string): boolean {
  const serverFilePath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.FILES.SERVER.FILE
  );

  if (!fs.existsSync(serverFilePath)) {
    console.log(
      `Warning: ${PROJECT.FILES.SERVER.FILE} not found at: ${serverFilePath}`
    );
    return false;
  }

  try {
    let serverFileContent = fs.readFileSync(serverFilePath, "utf8");

    // Add import for database initialization if it doesn't already exist
    if (!serverFileContent.includes("import { initializeDatabase }")) {
      const lastImportIndex = serverFileContent.lastIndexOf("import");
      const lastImportLineEnd = serverFileContent.indexOf(
        "\n",
        lastImportIndex
      );
      serverFileContent =
        serverFileContent.substring(0, lastImportLineEnd + 1) +
        `import { initializeDatabase } from './${PROJECT.FILES.DATABASE.DIRECTORY}/${PROJECT.FILES.DATABASE.FILES.CONNECTION}';\n` +
        serverFileContent.substring(lastImportLineEnd + 1);
    }

    fs.writeFileSync(serverFilePath, serverFileContent);
    return true;
  } catch (error) {
    console.error("Error updating server.ts:", error);
    return false;
  }
}

/**
 * Creates a models index.ts file based on database type
 * @param destination - Project destination directory
 * @param databaseType - Type of database being used
 * @param modelName - Default model name to export (e.g., "Example")
 * @returns true if the operation was successful, false otherwise
 */
export function createModelsIndexFile(
  destination: string,
  databaseType: string,
  modelName: string = "Example"
): boolean {
  try {
    const modelsDir = path.join(destination, "src", "models");
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }

    const modelsIndexPath = path.join(modelsDir, "index.ts");
    let indexContent = "";

    // Generate specific content based on database type
    switch (databaseType) {
      case DATABASE.TYPES.SEQUELIZE:
        indexContent = `// Export ${modelName} models and types
import ${modelName} from './${modelName}';

export { ${modelName} };
`;
        break;
      case DATABASE.TYPES.TYPEORM:
      case DATABASE.TYPES.MONGOOSE:
        indexContent = `export { ${modelName} } from './${modelName}';\n`;
        break;
      case DATABASE.TYPES.PRISMA:
        indexContent = `// Export Prisma models and types
import prisma from '@prisma/client';

export { prisma };
`;
        break;
      default:
        indexContent = `// Export models
export { ${modelName} } from './${modelName}';\n`;
    }

    fs.writeFileSync(modelsIndexPath, indexContent);
    return true;
  } catch (error) {
    console.error("Error creating models index file:", error);
    return false;
  }
}
