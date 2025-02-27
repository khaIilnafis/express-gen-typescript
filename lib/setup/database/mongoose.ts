import path from "path";
import {
  TEMPLATES,
  DATABASE,
  PROJECT,
} from "../../constants/index.js";
import { 
  getASTTemplatePath, 
  writeASTTemplate 
} from "../../utils/ast-template-processor.js";
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
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.FILES.DATABASE.DIRECTORY,
    PROJECT.FILES.DATABASE.FILES.CONNECTION
  );
  const exampleModelPath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.MODELS,
    PROJECT.FILES.MODELS.FILES.EXAMPLE
  );

  // Get database name from options or use default
  const databaseName =
    options.databaseName || normalizeDatabaseName(path.basename(destination));

  // Create database config file using AST template
  await writeASTTemplate(
    getASTTemplatePath(TEMPLATES.DATABASE.MONGOOSE.CONFIG),
    dbConfigPath,
    {
      databaseName,
    }
  );

  // Create example model using AST template
  await writeASTTemplate(
    getASTTemplatePath(TEMPLATES.DATABASE.MONGOOSE.EXAMPLE_MODEL),
    exampleModelPath,
    {}
  );

  // Create models index.ts file
  createModelsIndexFile(destination, DATABASE.TYPES.MONGOOSE, PROJECT.FILES.COMMON.NAMES.EXAMPLE);

  // Update server.ts to initialize database on startup
  updateServerWithDatabaseInit(destination);
}

export default setupMongoose;
