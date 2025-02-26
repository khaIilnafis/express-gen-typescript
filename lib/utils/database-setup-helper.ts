/**
 * Database setup helper utilities
 */

import path from "path";
import fs from "fs";
import {
  DATABASE,
  TEMPLATES,
  COMMON,
  PROJECT,
} from "../constants/index.js";
import {
  getTemplatePath,
  loadTemplate,
  writeTemplate,
  TemplateVariables,
} from "../utils/template-loader.js";
import {
  insertContentAtMarker,
  ensureDirectoryExists,
  FILE_MARKERS,
  addImportIfNotExists,
  updatePackageJson as updatePkgJson,
} from "./file-manipulation.js";
import {
  getDatabaseEnvVars,
  normalizeDatabaseName,
} from "./database-helper.js";

/**
 * Interface for database setup functions
 */
export interface DatabaseSetupContext {
  destination: string;
  databaseName: string;
  dialect?: string;
  options?: Record<string, any>;
}

/**
 * Utility class for database setup operations
 */
export class DatabaseSetupHelper {
  /**
   * Create necessary directories for database files
   * @param context - Database setup context
   * @param subdirectories - Additional subdirectories to create
   */
  static createDatabaseDirectories(
    context: DatabaseSetupContext,
    subdirectories: string[] = []
  ): void {
    const { destination } = context;

    // Create main database directories
    const modelsDir = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.DIRECTORIES.SRC.MODELS);
    const databaseDir = path.join(
      destination,
      PROJECT.DIRECTORIES.ROOT.SRC,
      PROJECT.DIRECTORIES.SRC.DATABASE
    );

    ensureDirectoryExists(modelsDir);
    ensureDirectoryExists(databaseDir);

    // Create additional subdirectories if specified
    for (const subdir of subdirectories) {
      const fullPath = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, subdir);
      ensureDirectoryExists(fullPath);
    }
  }

  /**
   * Write configuration file using template
   * @param context - Database setup context
   * @param templatePath - Path to template file (relative to templates directory)
   * @param outputPath - Destination path
   * @param templateVars - Variables to inject into template
   */
  static writeConfigFile(
    context: DatabaseSetupContext,
    templatePath: string,
    outputPath: string,
    templateVars: TemplateVariables = {}
  ): void {
    // Get absolute template path
    const absoluteTemplatePath = getTemplatePath(templatePath);

    // Combine context variables with template variables
    const variables: TemplateVariables = {
      databaseName: context.databaseName,
      dialect: context.dialect || "mysql",
      ...templateVars,
    };

    // Write the template with variables
    writeTemplate(absoluteTemplatePath, outputPath, variables);

    console.log(`Created database config file: ${path.basename(outputPath)}`);
  }

  /**
   * Create model files from templates
   * @param context - Database setup context
   * @param modelTemplates - Map of model name to template path
   * @param outputDirectory - Directory where models should be saved (relative to src/)
   */
  static createModels(
    context: DatabaseSetupContext,
    modelTemplates: Record<string, string>,
    outputDirectory: string
  ): void {
    const { destination, databaseName } = context;
    const modelsDir = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, outputDirectory);

    // Ensure models directory exists
    ensureDirectoryExists(modelsDir);

    // Create each model file
    Object.entries(modelTemplates).forEach(([modelName, templatePath]) => {
      const absoluteTemplatePath = getTemplatePath(templatePath);
      const outputPath = path.join(modelsDir, `${modelName}.model.ts`);

      // Variables for the template
      const variables: TemplateVariables = {
        databaseName,
        modelName,
        ModelName: modelName.charAt(0).toUpperCase() + modelName.slice(1),
      };

      writeTemplate(absoluteTemplatePath, outputPath, variables);
      console.log(`Created model: ${modelName}`);
    });
  }

  /**
   * Update package.json with database-related scripts
   * @param context - Database setup context
   * @param scripts - Map of script name to command
   */
  static updatePackageJson(
    context: DatabaseSetupContext,
    scripts: Record<string, string> = {}
  ): void {
    const { destination } = context;
    const packageJsonPath = path.join(destination, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      console.log(
        "Package.json not found. Database scripts will be added during package initialization."
      );

      // Store scripts to be added later
      // We'll add these scripts when package.json is created
      const dbScriptsPath = path.join(destination, ".db-scripts.json");
      fs.writeFileSync(dbScriptsPath, JSON.stringify(scripts, null, 2));
      return;
    }

    // Update package.json with scripts
    updatePkgJson(destination, { scripts });

    console.log("Updated package.json with database scripts");
  }

  /**
   * Update server file with database connection code
   * @param context - Database setup context
   * @param serverFilePath - Path to server file
   */
  static updateServerFile(
    context: DatabaseSetupContext,
    serverFilePath: string
  ): void {
    const { options, databaseName } = context;
    const databaseType = options?.database || "";
    console.log(
      `Updating server file for database connection (${databaseType})`
    );
    
    if (!fs.existsSync(serverFilePath)) {
      console.error(`File not found: ${PROJECT.FILES.SERVER.FILE}`);
      return;
    }

    // Add database imports
    switch (databaseType) {
      case DATABASE.TYPES.SEQUELIZE:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PROJECT.DIRECTORIES.SRC.DATABASE}/${PROJECT.FILES.DATABASE.FILES.CONNECT}';`
        );
        insertContentAtMarker(
          serverFilePath,
          FILE_MARKERS.SERVER.DATABASE_CONNECTION,
          loadTemplate(getTemplatePath(TEMPLATES.DATABASE.SEQUELIZE.INIT))
        );
        break;
      case DATABASE.TYPES.TYPEORM:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PROJECT.DIRECTORIES.SRC.DATABASE}/${PROJECT.FILES.DATABASE.FILES.CONNECT}';`
        );
		insertContentAtMarker(
			serverFilePath,
			FILE_MARKERS.SERVER.DATABASE_CONNECTION,
			loadTemplate(getTemplatePath(TEMPLATES.DATABASE.TYPEORM.INIT))
		  );
        break;
      case DATABASE.TYPES.PRISMA:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PROJECT.DIRECTORIES.SRC.DATABASE}/${PROJECT.FILES.DATABASE.FILES.CONNECT}';`
        );
		insertContentAtMarker(
			serverFilePath,
			FILE_MARKERS.SERVER.DATABASE_CONNECTION,
			loadTemplate(getTemplatePath(TEMPLATES.DATABASE.PRISMA.INIT))
		  );
        break;
      case DATABASE.TYPES.MONGOOSE:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PROJECT.DIRECTORIES.SRC.DATABASE}/${PROJECT.FILES.DATABASE.FILES.CONNECT}';`
        );
		insertContentAtMarker(
			serverFilePath,
			FILE_MARKERS.SERVER.DATABASE_CONNECTION,
			loadTemplate(getTemplatePath(TEMPLATES.DATABASE.MONGOOSE.INIT))
		  );
        break;
    }
    console.log(`Updated ${PROJECT.FILES.SERVER.FILE} with database connection`);
  }

  /**
   * Setup environment variables for database
   * @param context - Database setup context
   * @returns Object with environment variables
   */
  static setupEnvironmentVariables(
    context: DatabaseSetupContext
  ): Record<string, string> {
    const { destination, options, databaseName } = context;
    const databaseType = options?.database || "";

    // Get database-specific environment variables
    const envVars = getDatabaseEnvVars(databaseType, databaseName);

    // Create or update .env file
    const envFilePath = path.join(destination, ".env");

    if (fs.existsSync(envFilePath)) {
      console.log("Adding database environment variables to .env");

      // Read existing content
      let envContent = fs.readFileSync(envFilePath, "utf8");
      const dbSectionMarker = FILE_MARKERS.ENV.DATABASE;

      // Determine if we need to update or append
      if (envContent.includes(dbSectionMarker)) {
        // Find the section and extract the content following it
        const markerIndex = envContent.indexOf(dbSectionMarker);
        const nextSectionIndex = findNextSectionMarker(envContent, markerIndex);

        // Extract the portion before and after the section to replace
        const beforeSection = envContent.substring(
          0,
          markerIndex + dbSectionMarker.length
        );
        const afterSection =
          nextSectionIndex !== -1 ? envContent.substring(nextSectionIndex) : "";

        // Format the new env variables
        const newDbVars = Object.entries(envVars)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n");

        // Create the updated content
        const updatedContent =
          beforeSection + "\n" + newDbVars + "\n" + afterSection;

        // Write back to the file
        fs.writeFileSync(envFilePath, updatedContent);
      } else {
        // Append section to the end of the file
        const newSection = `\n${FILE_MARKERS.ENV.DATABASE}\n${Object.entries(envVars)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n")}\n`;
        fs.appendFileSync(envFilePath, newSection);
      }
    } else {
      // Create a new .env file
      const content = `${FILE_MARKERS.ENV.DATABASE}\n${Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n")}\n`;
      fs.writeFileSync(envFilePath, content);
    }

    return envVars;
  }

  /**
   * Create database index file
   * @param context - Database setup context
   * @param templatePath - Path to template file
   * @param outputPath - Destination path
   */
  static createDatabaseIndexFile(
    context: DatabaseSetupContext,
    templatePath: string,
    outputPath: string
  ): void {
    const absoluteTemplatePath = getTemplatePath(templatePath);
    const { databaseName, dialect } = context;

    writeTemplate(absoluteTemplatePath, outputPath, {
      databaseName,
      dialect: dialect || "mysql",
    });
  }
}

/**
 * Create database setup for the specified database type
 * @param destination - Project destination directory
 * @param database - Selected database type
 * @param options - Database setup options
 */
export async function setupDatabaseWithHelper(
  destination: string,
  database: string,
  options: Record<string, any> = {}
): Promise<void> {
  // Check if we've already accessed this module from another import path
  if ((global as any).databaseSetupInProgress) {
    console.log("Database setup already in progress, skipping duplicate setup");
    return;
  }

  // Set flag to prevent duplicate setup
  (global as any).databaseSetupInProgress = true;

  try {
    console.log(COMMON.MESSAGES.SETUP.DATABASE(database));

    // Prepare database name
    const databaseName =
      options.databaseName || normalizeDatabaseName(path.basename(destination));

    // Setup context
    const context: DatabaseSetupContext = {
      destination,
      databaseName,
      dialect: options.dialect,
      options: { ...options, database },
    };

    switch (database) {
      case DATABASE.TYPES.SEQUELIZE:
        await setupSequelize(context);
        break;
      case DATABASE.TYPES.TYPEORM:
        await setupTypeORM(context);
        break;
      case DATABASE.TYPES.PRISMA:
        await setupPrisma(context);
        break;
      case DATABASE.TYPES.MONGOOSE:
        await setupMongoose(context);
        break;
      default:
        console.log(`Skipping database setup for database type: ${database}`);
    }
  } finally {
    // Reset the flag when done
    (global as any).databaseSetupInProgress = false;
  }
}

/**
 * Set up Sequelize ORM
 * @param context - Database setup context
 */
async function setupSequelize(context: DatabaseSetupContext): Promise<void> {
  const { destination, databaseName, dialect } = context;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(context, ["migrations"]);

  // Create config file
  const configPath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.DATABASE,
    PROJECT.FILES.DATABASE.FILES.CONNECTION
  );
  DatabaseSetupHelper.writeConfigFile(
    context,
    TEMPLATES.DATABASE.SEQUELIZE.CONFIG,
    configPath,
    { dialect: dialect || "mysql" }
  );

  // Create models index
  const modelsIndexPath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.MODELS,
    PROJECT.FILES.MODELS.FILES.INDEX
  );
  DatabaseSetupHelper.createDatabaseIndexFile(
    context,
    TEMPLATES.DATABASE.SEQUELIZE.MODEL_INDEX,
    modelsIndexPath
  );

  // Create model files
  DatabaseSetupHelper.createModels(
    context,
    {
      example: TEMPLATES.DATABASE.SEQUELIZE.EXAMPLE_MODEL,
    },
    PROJECT.DIRECTORIES.SRC.MODELS
  );

  // Update server file
  const serverFilePath = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.FILES.SERVER.FILE);
  DatabaseSetupHelper.updateServerFile(context, serverFilePath);

  // Update package.json with scripts
  DatabaseSetupHelper.updatePackageJson(context, {
    "db:migrate": "npx sequelize-cli db:migrate",
    "db:seed": "npx sequelize-cli db:seed:all",
  });

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(context);
}

/**
 * Set up TypeORM
 * @param context - Database setup context
 */
async function setupTypeORM(context: DatabaseSetupContext): Promise<void> {
  const { destination, databaseName, dialect } = context;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(context, [
    "entity",
    "migration",
  ]);

  // Create config file
  const configPath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.DATABASE,
    PROJECT.FILES.DATABASE.FILES.CONNECTION
  );
  DatabaseSetupHelper.writeConfigFile(
    context,
    TEMPLATES.DATABASE.TYPEORM.CONFIG,
    configPath,
    { dialect: dialect || "postgres" }
  );

  // Create entity files
  DatabaseSetupHelper.createModels(
    context,
    {
      example: TEMPLATES.DATABASE.TYPEORM.EXAMPLE_MODEL,
    },
    "entity"
  );

  // Update server file
  const serverFilePath = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.FILES.SERVER.FILE);
  DatabaseSetupHelper.updateServerFile(context, serverFilePath);

  // Update package.json with scripts
  DatabaseSetupHelper.updatePackageJson(context, {
    typeorm: "typeorm-ts-node-esm",
    "db:migrate": "npm run typeorm migration:run",
    "db:generate": "npm run typeorm migration:generate",
    "db:create": "npm run typeorm migration:create",
  });

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(context);
}

/**
 * Set up Prisma
 * @param context - Database setup context
 */
async function setupPrisma(context: DatabaseSetupContext): Promise<void> {
  const { destination, databaseName } = context;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(context);

  // Create schema file in src/database directory
  const schemaPath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.DATABASE,
    PROJECT.FILES.DATABASE.FILES.CONNECTION
  );

  DatabaseSetupHelper.writeConfigFile(
    context,
    TEMPLATES.DATABASE.PRISMA.EXAMPLE_MODEL,
    schemaPath,
    { databaseName }
  );

  // Update server file
  const serverFilePath = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.FILES.SERVER.FILE);
  DatabaseSetupHelper.updateServerFile(context, serverFilePath);

  // Update package.json with scripts
  DatabaseSetupHelper.updatePackageJson(context, {
    "db:push": "prisma db push --schema=./src/database/schema.prisma",
    "db:migrate": "prisma migrate dev --schema=./src/database/schema.prisma",
    "db:studio": "prisma studio --schema=./src/database/schema.prisma",
    "db:generate": "prisma generate --schema=./src/database/schema.prisma",
  });

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(context);
}

/**
 * Set up Mongoose
 * @param context - Database setup context
 */
async function setupMongoose(context: DatabaseSetupContext): Promise<void> {
  const { destination, databaseName } = context;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(context);

  // Create config file
  const configPath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    PROJECT.DIRECTORIES.SRC.DATABASE,
    PROJECT.FILES.DATABASE.FILES.CONNECTION
  );
  DatabaseSetupHelper.writeConfigFile(
    context,
    TEMPLATES.DATABASE.MONGOOSE.CONFIG,
    configPath,
    { databaseName }
  );

  // Create model files
  DatabaseSetupHelper.createModels(
    context,
    {
      example: TEMPLATES.DATABASE.MONGOOSE.EXAMPLE_MODEL,
    },
    PROJECT.DIRECTORIES.SRC.MODELS
  );

  // Update server file
  const serverFilePath = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.FILES.SERVER.FILE);
  DatabaseSetupHelper.updateServerFile(context, serverFilePath);

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(context);
}

/**
 * Helper function to find the next section marker in .env file
 * @param content - File content
 * @param startPosition - Position to start searching from
 * @returns Position of the next marker or -1 if none found
 */
function findNextSectionMarker(content: string, startPosition: number): number {
  const possibleMarkers = Object.values(FILE_MARKERS.ENV);
  let nextPosition = -1;

  // Find the position of each marker after the starting position
  possibleMarkers.forEach((marker) => {
    const position = content.indexOf(marker, startPosition + marker.length);
    if (position !== -1 && (nextPosition === -1 || position < nextPosition)) {
      nextPosition = position;
    }
  });

  return nextPosition;
}
