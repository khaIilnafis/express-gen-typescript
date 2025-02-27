import path from "path";
import fs from "fs";
import {
  TEMPLATES,
  PROJECT,
  DATABASE
} from "../../constants/index.js";
import { getASTTemplatePath, writeASTTemplate } from "../../utils/ast-template-processor.js";
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
  dialect?: string;
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
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.DATABASE,
    PROJECT.FILES.DATABASE.FILES.CONNECTION
  );
  const exampleEntityPath = path.join(
    destination,
   PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.MODELS,
    PROJECT.FILES.MODELS.FILES.EXAMPLE
  );
  // Create entities directory if it doesn't exist
  const entitiesDir = path.join(
    destination,
   PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.MODELS
  );
  if (!fs.existsSync(entitiesDir)) {
    fs.mkdirSync(entitiesDir, { recursive: true });
  }

  // Get database name from options or use default
  const databaseName =
    options.databaseName || normalizeDatabaseName(path.basename(destination));

  // Get dialect from options or use default
  const dialect = options.dialect || "postgres";

  // Create database config file using AST template
  await writeASTTemplate(
    getASTTemplatePath(TEMPLATES.DATABASE.TYPEORM.CONFIG),
    dbConfigPath,
    {
      databaseName,
      dialect
    }
  );
  
  // Create example model using AST template
  await writeASTTemplate(
    getASTTemplatePath(TEMPLATES.DATABASE.TYPEORM.EXAMPLE_MODEL),
    exampleEntityPath,
    {}
  );

  // Create entities index file
  createModelsIndexFile(destination, DATABASE.TYPES.TYPEORM, PROJECT.FILES.COMMON.NAMES.EXAMPLE);

  // Update server.ts to initialize database on startup
  updateServerWithDatabaseInit(destination);
}

export default setupTypeORM;
