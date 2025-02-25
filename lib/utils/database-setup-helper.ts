/**
 * Database setup helper utilities
 */

import path from "path";
import fs from "fs";
import { DATABASES, TEMPLATES, ERRORS, MESSAGES } from "../constants/index.js";
import {
  getTemplatePath,
  loadTemplate,
  writeTemplate,
  TemplateVariables,
} from "../utils/template-loader.js";
import {
  insertContentAtMarker,
  replaceContentBetweenMarkers,
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
    const modelsDir = path.join(destination, "src", "models");
    const configDir = path.join(destination, "src", "config");

    ensureDirectoryExists(modelsDir);
    ensureDirectoryExists(configDir);

    // Create additional subdirectories if specified
    for (const subdir of subdirectories) {
      const fullPath = path.join(destination, "src", subdir);
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
    const modelsDir = path.join(destination, "src", outputDirectory);

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
      console.error(`File not found: package.json`);
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
    const { options } = context;
    const databaseType = options?.database || "";

    if (!fs.existsSync(serverFilePath)) {
      console.error(`File not found: server.ts`);
      return;
    }

    // Add database imports
    switch (databaseType) {
      case DATABASES.TYPES.SEQUELIZE:
        addImportIfNotExists(
          serverFilePath,
          "import sequelize from './config/database.js';"
        );
        break;
      case DATABASES.TYPES.TYPEORM:
        addImportIfNotExists(
          serverFilePath,
          "import { AppDataSource } from './config/database.js';"
        );
        break;
      case DATABASES.TYPES.PRISMA:
        addImportIfNotExists(
          serverFilePath,
          "import { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();"
        );
        break;
      case DATABASES.TYPES.MONGOOSE:
        addImportIfNotExists(serverFilePath, "import './config/database.js';");
        break;
    }

    // Add database connection code
    let connectionCode = "";
    switch (databaseType) {
      case DATABASES.TYPES.SEQUELIZE:
        connectionCode = `
// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });`;
        break;
      case DATABASES.TYPES.TYPEORM:
        connectionCode = `
// Database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });`;
        break;
      case DATABASES.TYPES.PRISMA:
        connectionCode = `
// Database connection
(async () => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
})();

// Close Prisma connection when app terminates
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});`;
        break;
      case DATABASES.TYPES.MONGOOSE:
        // Connection is handled in the database config file
        break;
    }

    if (connectionCode) {
      // Insert connection code at the appropriate marker
      insertContentAtMarker(
        serverFilePath,
        FILE_MARKERS.SERVER.DATABASE_CONNECTION,
        connectionCode,
        "after"
      );
    }

    console.log("Updated server.ts with database connection");
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

      // Check if database section exists
      if (!envContent.includes(FILE_MARKERS.ENV.DATABASE)) {
        envContent += `\n${FILE_MARKERS.ENV.DATABASE}\n`;

        // Add each env var
        Object.entries(envVars).forEach(([key, value]) => {
          envContent += `${key}=${value}\n`;
        });

        // Write updated content
        fs.writeFileSync(envFilePath, envContent);
      } else {
        // Update existing section
        replaceContentBetweenMarkers(
          envFilePath,
          FILE_MARKERS.ENV.DATABASE,
          "\n",
          Object.entries(envVars)
            .map(([key, value]) => `${key}=${value}`)
            .join("\n") + "\n"
        );
      }
    } else {
      console.log("Creating .env file with database environment variables");

      // Create new .env file
      let envContent = `${FILE_MARKERS.ENV.DATABASE}\n`;

      // Add each env var
      Object.entries(envVars).forEach(([key, value]) => {
        envContent += `${key}=${value}\n`;
      });

      // Write content
      fs.writeFileSync(envFilePath, envContent);
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
  console.log(MESSAGES.SETUP.DATABASE(database));

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
    case DATABASES.TYPES.SEQUELIZE:
      await setupSequelize(context);
      break;
    case DATABASES.TYPES.TYPEORM:
      await setupTypeORM(context);
      break;
    case DATABASES.TYPES.PRISMA:
      await setupPrisma(context);
      break;
    case DATABASES.TYPES.MONGOOSE:
      await setupMongoose(context);
      break;
    default:
      console.log(`Skipping database setup for database type: ${database}`);
  }
}

/**
 * Set up Sequelize ORM
 * @param context - Database setup context
 */
async function setupSequelize(context: DatabaseSetupContext): Promise<void> {
  const { destination, databaseName } = context;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(context, ["migrations"]);

  // Create config file
  const configPath = path.join(destination, "src", "config", "database.ts");
  DatabaseSetupHelper.writeConfigFile(
    context,
    TEMPLATES.DATABASE.SEQUELIZE.CONFIG,
    configPath,
    { dialect: "mysql" }
  );

  // Create models index
  const modelsIndexPath = path.join(destination, "src", "models", "index.ts");
  DatabaseSetupHelper.createDatabaseIndexFile(
    context,
    TEMPLATES.DATABASE.SEQUELIZE.MODEL_INDEX,
    modelsIndexPath
  );

  // Create model files
  DatabaseSetupHelper.createModels(
    context,
    {
      user: TEMPLATES.DATABASE.SEQUELIZE.USER_MODEL,
      example: TEMPLATES.DATABASE.SEQUELIZE.EXAMPLE_MODEL,
    },
    "models"
  );

  // Update server file
  const serverFilePath = path.join(destination, "src", "server.ts");
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
  const { destination, databaseName } = context;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(context, [
    "entity",
    "migration",
  ]);

  // Create config file
  const configPath = path.join(destination, "src", "config", "database.ts");
  DatabaseSetupHelper.writeConfigFile(
    context,
    TEMPLATES.DATABASE.TYPEORM.CONFIG,
    configPath,
    { dialect: "mysql" }
  );

  // Create entity files
  DatabaseSetupHelper.createModels(
    context,
    {
      user: TEMPLATES.DATABASE.TYPEORM.USER_ENTITY,
      example: TEMPLATES.DATABASE.TYPEORM.EXAMPLE_ENTITY,
    },
    "entity"
  );

  // Update server file
  const serverFilePath = path.join(destination, "src", "server.ts");
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
  DatabaseSetupHelper.createDatabaseDirectories(context, ["prisma"]);

  // Create prisma directory
  const prismaDir = path.join(destination, "prisma");
  ensureDirectoryExists(prismaDir);

  // Create schema file
  const schemaPath = path.join(prismaDir, "schema.prisma");
  DatabaseSetupHelper.writeConfigFile(
    context,
    TEMPLATES.DATABASE.PRISMA.SCHEMA,
    schemaPath,
    { databaseName }
  );

  // Update server file
  const serverFilePath = path.join(destination, "src", "server.ts");
  DatabaseSetupHelper.updateServerFile(context, serverFilePath);

  // Update package.json with scripts
  DatabaseSetupHelper.updatePackageJson(context, {
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
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
  const configPath = path.join(destination, "src", "config", "database.ts");
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
      user: TEMPLATES.DATABASE.MONGOOSE.USER_MODEL,
      example: TEMPLATES.DATABASE.MONGOOSE.EXAMPLE_MODEL,
    },
    "models"
  );

  // Update server file
  const serverFilePath = path.join(destination, "src", "server.ts");
  DatabaseSetupHelper.updateServerFile(context, serverFilePath);

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(context);
}
