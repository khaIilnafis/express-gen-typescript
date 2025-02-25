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
 * Options for Mongoose setup
 */
export interface MongooseSetupOptions {
  databaseName?: string;
  [key: string]: any;
}

/**
 * Setup Mongoose ODM
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupMongoose(
  destination: string,
  options: MongooseSetupOptions = {}
): Promise<void> {
  console.log("Setting up Mongoose ODM...");
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

  // Create database config file using template
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.MONGOOSE.CONFIG),
    dbConfigPath,
    {
      databaseName,
    }
  );

  // Create example model using template
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.MONGOOSE.EXAMPLE_MODEL),
    exampleModelPath
  );

  //   // Create database init file using template
  //   writeTemplate(getTemplatePath(TEMPLATES.DATABASE.MONGOOSE.INIT), dbInitPath);

  // Create models index.ts file
  createModelsIndexFile(destination, DATABASES.TYPES.MONGOOSE, "Example");

  // Update server.ts to initialize database on startup
  updateServerWithDatabaseInit(destination);
}

export default setupMongoose;
