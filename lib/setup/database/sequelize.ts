import path from "path";
import {
  TEMPLATES,
  PROJECT
} from "../../constants/index.js";
import { getASTTemplatePath, writeASTTemplate } from "../../utils/ast-template-processor.js";
import {
  normalizeDatabaseName,
  updateServerWithDatabaseInit,
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
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.DATABASE,
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

  // Get dialect from options or use default
  const dialect = options.dialect || "postgres";

  // Create database config file using AST template
  await writeASTTemplate(
    getASTTemplatePath(TEMPLATES.DATABASE.SEQUELIZE.CONFIG),
    dbConfigPath,
    {
      databaseName,
      dialect,
    }
  );

  // Create example model using AST template
  await writeASTTemplate(
    getASTTemplatePath(TEMPLATES.DATABASE.SEQUELIZE.EXAMPLE_MODEL),
    exampleModelPath,
    {}
  );

  // Create models index.ts file using AST template
  const modelsIndexPath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.MODELS,
    PROJECT.FILES.MODELS.FILES.INDEX
  );
  
  await writeASTTemplate(
    getASTTemplatePath(TEMPLATES.DATABASE.SEQUELIZE.MODEL_INDEX),
    modelsIndexPath,
    {
      databaseName,
      dialect
    }
  );

  // Update server.ts to initialize database on startup
  updateServerWithDatabaseInit(destination);
}

export default setupSequelize;
