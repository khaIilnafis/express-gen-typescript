import path from "path";
import fs from "fs";
import {
  TEMPLATES,
  DATABASES,
  DIRECTORIES,
  FILE_PATHS,
} from "../../constants/index.js";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import {
  normalizeDatabaseName,
  updateServerWithDatabaseInit,
  createModelsIndexFile,
} from "../../utils/database-helper.js";

/**
 * Options for TypeORM setup
 */
export interface TypeORMSetupOptions {
  databaseName?: string;
  [key: string]: any;
}

/**
 * Setup TypeORM
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupTypeORM(
  destination: string,
  options: TypeORMSetupOptions = {}
): Promise<void> {
  console.log("Setting up TypeORM...");

  // Define paths for destination files
  const dbConfigPath = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    FILE_PATHS.DATABASE.DIRECTORY,
    FILE_PATHS.DATABASE.FILES.DATA_SOURCE
  );
  const exampleEntityPath = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    DIRECTORIES.SRC.MODELS,
    FILE_PATHS.MODELS.FILES.EXAMPLE
  );
  const dbInitPath = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    FILE_PATHS.DATABASE.DIRECTORY,
    FILE_PATHS.DATABASE.FILES.INIT
  );

  // Create entities directory if it doesn't exist
  const entitiesDir = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    DIRECTORIES.SRC.MODELS
  );
  if (!fs.existsSync(entitiesDir)) {
    fs.mkdirSync(entitiesDir, { recursive: true });
  }

  // Get database name from options or use default
  const databaseName =
    options.databaseName || normalizeDatabaseName(path.basename(destination));

  // Create database config file using template
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.TYPEORM.DATA_SOURCE),
    dbConfigPath,
    {
      databaseName,
    }
  );
  // Create Example entity file using template
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.TYPEORM.EXAMPLE),
    exampleEntityPath
  );

  // Create database init file using template
  writeTemplate(getTemplatePath(TEMPLATES.DATABASE.TYPEORM.INIT), dbInitPath);

  // Create entities index file
  createModelsIndexFile(destination, DATABASES.TYPES.TYPEORM, "Example");

  // Update server.ts to initialize database on startup
  updateServerWithDatabaseInit(destination);
}

export default setupTypeORM;
