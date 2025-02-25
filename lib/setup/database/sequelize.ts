import path from "path";
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
 * Options for Sequelize setup
 */
export interface SequelizeSetupOptions {
  databaseName?: string;
  dialect?: string;
  [key: string]: any;
}

/**
 * Setup Sequelize ORM
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupSequelize(
  destination: string,
  options: SequelizeSetupOptions = {}
): Promise<void> {
  console.log("Setting up Sequelize ORM...");

  // Define paths for destination files
  const dbConfigPath = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    FILE_PATHS.DATABASE.DIRECTORY,
    FILE_PATHS.DATABASE.FILES.CONNECTION
  );
  const exampleModelPath = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    DIRECTORIES.SRC.MODELS,
    FILE_PATHS.MODELS.FILES.EXAMPLE
  );

  // Get database name from options or use default
  const databaseName =
    options.databaseName || normalizeDatabaseName(path.basename(destination));

  // Get dialect from options or use default
  const dialect = options.dialect || "postgres";

  // Create database config file using template
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.SEQUELIZE.CONFIG),
    dbConfigPath,
    {
      databaseName,
      dialect,
    }
  );

  // Create example model using template
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.SEQUELIZE.EXAMPLE_MODEL),
    exampleModelPath
  );

  //   // Create database init file using template
  //   writeTemplate(getTemplatePath(TEMPLATES.DATABASE.SEQUELIZE.INIT), dbInitPath);

  // Create models index.ts file
  createModelsIndexFile(destination, DATABASES.TYPES.SEQUELIZE, "Example");

  // Update server.ts to initialize database on startup
  updateServerWithDatabaseInit(destination);
}

export default setupSequelize;
