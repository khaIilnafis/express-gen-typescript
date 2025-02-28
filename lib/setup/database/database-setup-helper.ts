/**
 * Database setup helper utilities
 */

import path from "path";
import fs from "fs";
import {
  DATABASE,
  TEMPLATES,
  PATHS,
} from "../../constants/index.js";
import {
  insertContentAtMarker,
  ensureDirectoryExists,
  addImportIfNotExists,
  updatePackageJson as updatePkgJson,
} from "../../utils/file-manipulation.js";
import {
  getASTTemplatePath,
  writeASTTemplate,
} from "../../utils/ast-template-processor.js";
import { GeneratorOptions, TemplateOptions, TemplateVariables } from "../../utils/types.js";

/**
 * Utility class for database setup operations
 */
export class DatabaseSetupHelper {
  /**
   * Create necessary directories for database files
   * @param options - Database setup options
   * @param subdirectories - Additional subdirectories to create
   */
  static createDatabaseDirectories(
    options: GeneratorOptions,
    subdirectories: string[] = []
  ): void {
    const { destination } = options;

    // Create main database directories
    const modelsDir = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.MODELS);
    const databaseDir = path.join(
      destination,
      PATHS.DIRECTORIES.ROOT.SRC,
      PATHS.DIRECTORIES.SRC.DATABASE
    );

    ensureDirectoryExists(modelsDir);
    ensureDirectoryExists(databaseDir);

    // Create additional subdirectories if specified
    for (const subdir of subdirectories) {
      const fullPath = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, subdir);
      ensureDirectoryExists(fullPath);
    }
  }

  /**
   * Write configuration file using template
   * @param options - Database setup options
   * @param templatePath - Path to template file (relative to templates directory)
   * @param outputPath - Destination path
   * @param templateVars - Variables to inject into template
   */
  static async writeConfigFile(
    options: GeneratorOptions,
    templatePath: string,
    outputPath: string,
    templateVars: TemplateVariables = {}
  ): Promise<void> {
    // Combine options variables with template variables
    const variables: TemplateOptions = {
      ...options,
      ...templateVars,
    };

    // Write the template with variables
    // writeTemplate(absoluteTemplatePath, outputPath, variables);
	await writeASTTemplate(
		getASTTemplatePath(templatePath),
		outputPath,
		variables
	  );
    console.log(`Created database config file: ${path.basename(outputPath)}`);
  }

  /**
   * Create model files from templates
   * @param options - Database setup options
   * @param modelTemplates - Map of model name to template path
   * @param outputDirectory - Directory where models should be saved (relative to src/)
   */
  static async createModels(
    options: GeneratorOptions,
    modelTemplates: Record<string, string>,
    outputDirectory: string
  ): Promise<void> {
    const { destination, databaseName, dialect } = options;
    const modelsDir = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, outputDirectory);

    // Ensure models directory exists
    ensureDirectoryExists(modelsDir);

    // Create each model file
    Object.entries(modelTemplates).forEach(async ([modelName, templatePath]) => {
    //   const absoluteTemplatePath = getTemplatePath(templatePath);
      const outputPath = path.join(modelsDir, `${modelName}.ts`);

      // Variables for the template
      const variables: TemplateVariables = {
        databaseName: options.databaseName!,
        modelName,
		dialect: dialect ? dialect : 'postgres',
        ModelName: modelName.charAt(0).toUpperCase() + modelName.slice(1),
      };

    //   writeTemplate(absoluteTemplatePath, outputPath, variables);
	  await writeASTTemplate(
		getASTTemplatePath(templatePath),
		outputPath,
		variables
	  );
      console.log(`Created model: ${modelName}`);
    });
  }

  /**
   * Update package.json with database-related scripts
   * @param options - Database setup options
   * @param scripts - Map of script name to command
   */
  static updatePackageJson(
    options: GeneratorOptions,
    scripts: Record<string, string> = {}
  ): void {
    const { destination } = options;
    const packageJsonPath = path.join(destination, PATHS.FILES.CONFIG.PCKGMGR);

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
   * @param options - Database setup options
   * @param serverFilePath - Path to server file
   */
  static async updateServerFile(
    options: GeneratorOptions,
    serverFilePath: string
  ): Promise<void> {
    console.log(
      `Updating server file for database connection (${options.dialect})`
    );
    
    if (!fs.existsSync(serverFilePath)) {
      console.error(`File not found: ${PATHS.FILES.SERVER.FILE}`);
      return;
    }

    // Add database imports
    switch (options.dialect) {
      case DATABASE.TYPES.SEQUELIZE:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PATHS.DIRECTORIES.SRC.DATABASE}/${PATHS.FILES.COMMON.NAMES.CONNECTION}';`
        );
        
        // Generate temp file with the AST template output
        const tempFilePath = path.join(path.dirname(serverFilePath), 'db-init-temp.ts');
        await writeASTTemplate(
          getASTTemplatePath(PATHS.FILES.MODELS.INIT_TEMPLATE_LOC(DATABASE.TYPES.SEQUELIZE)),
          tempFilePath,
          options
        );
        
        // Read the generated content and add it to the server file
        const generatedContent = fs.readFileSync(tempFilePath, 'utf8');
        insertContentAtMarker(
          serverFilePath,
          TEMPLATES.STRINGS.MARKERS.SERVER.DATABASE_CONNECTION,
          generatedContent
        );
        
        // Clean up temp file
        fs.unlinkSync(tempFilePath);
        break;
      case DATABASE.TYPES.TYPEORM:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PATHS.DIRECTORIES.SRC.DATABASE}/${PATHS.FILES.COMMON.NAMES.CONNECTION}';`
        );
        
        // Generate temp file with the AST template output
        const typeormTempFilePath = path.join(path.dirname(serverFilePath), 'db-init-temp.ts');
        await writeASTTemplate(
          getASTTemplatePath(PATHS.FILES.MODELS.INDEX_TEMPLATE_LOC(DATABASE.TYPES.TYPEORM)),
          typeormTempFilePath,
          options
        );
        
        // Read the generated content and add it to the server file
        const typeormGeneratedContent = fs.readFileSync(typeormTempFilePath, 'utf8');
        insertContentAtMarker(
          serverFilePath,
          TEMPLATES.STRINGS.MARKERS.SERVER.DATABASE_CONNECTION,
          typeormGeneratedContent
        );
        
        // Clean up temp file
        fs.unlinkSync(typeormTempFilePath);
        break;
      case DATABASE.TYPES.PRISMA:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PATHS.DIRECTORIES.SRC.DATABASE}/${PATHS.FILES.COMMON.NAMES.CONNECTION}';`
        );
        
        // Generate temp file with the AST template output
        const prismaTempFilePath = path.join(path.dirname(serverFilePath), 'db-init-temp.ts');
        await writeASTTemplate(
          getASTTemplatePath(PATHS.FILES.MODELS.INDEX_TEMPLATE_LOC(DATABASE.TYPES.PRISMA)),
          prismaTempFilePath,
        options
        );
        
        // Read the generated content and add it to the server file
        const prismaGeneratedContent = fs.readFileSync(prismaTempFilePath, 'utf8');
        insertContentAtMarker(
          serverFilePath,
          TEMPLATES.STRINGS.MARKERS.SERVER.DATABASE_CONNECTION,
          prismaGeneratedContent
        );
        
        // Clean up temp file
        fs.unlinkSync(prismaTempFilePath);
        break;
      case DATABASE.TYPES.MONGOOSE:
        addImportIfNotExists(
          serverFilePath,
          `import { initializeDatabase } from './${PATHS.DIRECTORIES.SRC.DATABASE}/${PATHS.FILES.COMMON.NAMES.CONNECTION}';`
        );
        
        // Generate temp file with the AST template output
        const mongooseTempFilePath = path.join(path.dirname(serverFilePath), 'db-init-temp.ts');
        await writeASTTemplate(
          getASTTemplatePath(PATHS.FILES.MODELS.INDEX_TEMPLATE_LOC(DATABASE.TYPES.MONGOOSE)),
          mongooseTempFilePath,
          options
        );
        
        // Read the generated content and add it to the server file
        const mongooseGeneratedContent = fs.readFileSync(mongooseTempFilePath, 'utf8');
        insertContentAtMarker(
          serverFilePath,
          TEMPLATES.STRINGS.MARKERS.SERVER.DATABASE_CONNECTION,
          mongooseGeneratedContent
        );
        
        // Clean up temp file
        fs.unlinkSync(mongooseTempFilePath);
        break;
    }
    console.log(`Updated ${PATHS.FILES.SERVER.FILE} with database connection`);
  }

  /**
   * Setup environment variables for database
   * @param options - Database setup options
   * @returns Object with environment variables
   */
  static setupEnvironmentVariables(
    options: GeneratorOptions
  ): Record<string, string> {
    const { destination, databaseName, dialect } = options;
    const dbDialect = options?.dialect || "";

    // Get database-specific environment variables
    const envVars = getDatabaseEnvVars(dbDialect, databaseName!);

    // Create or update .env file
    const envFilePath = path.join(destination, ".env");

    if (fs.existsSync(envFilePath)) {
      console.log("Adding database environment variables to .env");

      // Read existing content
      let envContent = fs.readFileSync(envFilePath, "utf8");
      const dbSectionMarker =TEMPLATES.STRINGS.MARKERS.ENV.DATABASE;

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
        const newSection = `\n${TEMPLATES.STRINGS.MARKERS.ENV.DATABASE}\n${Object.entries(envVars)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n")}\n`;
        fs.appendFileSync(envFilePath, newSection);
      }
    } else {
      // Create a new .env file
      const content = `${TEMPLATES.STRINGS.MARKERS.ENV.DATABASE}\n${Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n")}\n`;
      fs.writeFileSync(envFilePath, content);
    }

    return envVars;
  }

  /**
   * Create database index file
   * @param options - Database setup options
   * @param templatePath - Path to template file
   * @param outputPath - Destination path
   */
  static async createModelIndexFile(
    options: GeneratorOptions,
    templatePath: string,
    outputPath: string
  ): Promise<void> {
    // const absoluteTemplatePath = getTemplatePath(templatePath);
    const { databaseName, dialect } = options;

    // writeTemplate(absoluteTemplatePath, outputPath, {
    //   databaseName,
    //   dialect: dialect || "mysql",
    // });
	await writeASTTemplate(
		getASTTemplatePath(templatePath),
		outputPath,
		options
	  );
  }
}
/**
 * Get default database name based on project name or database type
 * @param projectName - The name of the project
 * @param dbType - The database type
 * @returns Normalized database name
 */
export function getDefaultDatabaseName(
	projectName: string,
	dialect: string
  ): string {
	// Return appropriate default name based on database type
	if (dialect === DATABASE.TYPES.MONGOOSE) {
	  return projectName || DATABASE.DEFAULTS.MONGODB.DEFAULT_DB_NAME;
	} else if (
		dialect === DATABASE.TYPES.PRISMA ||
		dialect === DATABASE.TYPES.TYPEORM
	) {
	  return projectName || DATABASE.DEFAULTS.POSTGRES.DEFAULT_DB_NAME;
	} else if (dialect === DATABASE.TYPES.SEQUELIZE) {
	  return projectName || DATABASE.DEFAULTS.MYSQL.DEFAULT_DB_NAME;
	}
  
	return projectName || "express_app";
  }
/**
 * Generate appropriate environment variables for database configuration
 * @param dbType - Database type
 * @param dbName - Database name
 * @returns Object containing environment variables
 */
export function getDatabaseEnvVars(
	dialect: string,
	dbName: string
  ): Record<string, string> {
	const envVars: Record<string, string> = {};
  
	if (dialect === DATABASE.TYPES.MONGOOSE) {
	  envVars.MONGODB_URI = DATABASE.DEFAULTS.MONGODB.URI(dbName);
	} else if (dialect === DATABASE.TYPES.PRISMA) {
	  envVars.DATABASE_URL = DATABASE.DEFAULTS.POSTGRES.URI(dbName);
	} else if (dialect === DATABASE.TYPES.TYPEORM) {
	  const { HOST, PORT, USER, PASSWORD } = DATABASE.DEFAULTS.POSTGRES;
	  envVars.DB_TYPE = DATABASE.DIALECTS.POSTGRES;
	  envVars.DB_HOST = HOST;
	  envVars.DB_PORT = PORT;
	  envVars.DB_NAME = dbName;
	  envVars.DB_USER = USER;
	  envVars.DB_PASSWORD = PASSWORD;
	} else if (dialect === DATABASE.TYPES.SEQUELIZE) {
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
 * Create database setup for the specified database type
 * @param destination - Project destination directory
 * @param database - Selected database type
 * @param options - Database setup options
 */
export async function setupDatabaseWithHelper(
  options: GeneratorOptions
): Promise<void> {
  try {
    switch (options.dialect) {
      case DATABASE.TYPES.SEQUELIZE:
        await setupSequelize(options);
        break;
      case DATABASE.TYPES.TYPEORM:
        await setupTypeORM(options);
        break;
      case DATABASE.TYPES.PRISMA:
        await setupPrisma(options);
        break;
      case DATABASE.TYPES.MONGOOSE:
        await setupMongoose(options);
        break;
      default:
        console.log(`Skipping database setup for database type: ${options.database}`);
    }
  }catch(err){
	throw(err);
  }
}

/**
 * Set up Sequelize ORM
 * @param options - Database setup options
 */
async function setupSequelize(options: GeneratorOptions): Promise<void> {
  const { destination, databaseName, dialect } = options;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(options, ["migrations"]);

  // Create config file
  const configPath = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.DATABASE,
    PATHS.FILES.DATABASE.CONNECTION
  );
  DatabaseSetupHelper.writeConfigFile(
    options,
    PATHS.FILES.DATABASE.CONNECTION_TEMPLATE_LOC(DATABASE.TYPES.SEQUELIZE),
    configPath,
    { dialect: dialect || "mysql" }
  );

  // Create models index
  const modelsIndexPath = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.MODELS,
    PATHS.FILES.MODELS.INDEX
  );
  await DatabaseSetupHelper.createModelIndexFile(
    options,
    PATHS.FILES.MODELS.INDEX_TEMPLATE_LOC(DATABASE.TYPES.SEQUELIZE),
    modelsIndexPath
  );

  // Create model files
  await DatabaseSetupHelper.createModels(
    options,
    {
      example: PATHS.FILES.MODELS.EXAMPLE_TEMPLATE_LOC(DATABASE.TYPES.SEQUELIZE),
    },
    PATHS.DIRECTORIES.SRC.MODELS
  );

  // Update server file
  const serverFilePath = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.FILES.SERVER.FILE);
  await DatabaseSetupHelper.updateServerFile(options, serverFilePath);

  // Update package.json with scripts
  DatabaseSetupHelper.updatePackageJson(options, {
    "db:migrate": "npx sequelize-cli db:migrate",
    "db:seed": "npx sequelize-cli db:seed:all",
  });

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(options);
}

/**
 * Set up TypeORM
 * @param options - Database setup options
 */
async function setupTypeORM(options: GeneratorOptions): Promise<void> {
  const { destination, databaseName, dialect } = options;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(options, [
    "entity",
    "migration",
  ]);

  // Create config file
  const configPath = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.DATABASE,
    PATHS.FILES.DATABASE.CONNECTION
  );
  await DatabaseSetupHelper.writeConfigFile(
    options,
    PATHS.FILES.DATABASE.CONNECTION_TEMPLATE_LOC(DATABASE.TYPES.TYPEORM),
    configPath,
    { dialect: dialect || "postgres" }
  );

  // Create entity files
  await DatabaseSetupHelper.createModels(
    options,
    {
      example: PATHS.FILES.MODELS.EXAMPLE_TEMPLATE_LOC(DATABASE.TYPES.TYPEORM),
    },
    "entity"
  );

  // Update server file
  const serverFilePath = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.FILES.SERVER.FILE);
  await DatabaseSetupHelper.updateServerFile(options, serverFilePath);

  // Update package.json with scripts
  DatabaseSetupHelper.updatePackageJson(options, {
    typeorm: "typeorm-ts-node-esm",
    "db:migrate": "npm run typeorm migration:run",
    "db:generate": "npm run typeorm migration:generate",
    "db:create": "npm run typeorm migration:create",
  });

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(options);
}

/**
 * Set up Prisma
 * @param options - Database setup options
 */
async function setupPrisma(options: GeneratorOptions): Promise<void> {
  const { destination, databaseName } = options;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(options);

  // Create schema file in src/database directory
  const schemaPath = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.DATABASE,
    PATHS.FILES.DATABASE.CONNECTION
  );

  await DatabaseSetupHelper.writeConfigFile(
    options,
    PATHS.FILES.MODELS.EXAMPLE_TEMPLATE_LOC(DATABASE.TYPES.PRISMA),
    schemaPath,
    { databaseName: databaseName! }
  );

  // Update server file
  const serverFilePath = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.FILES.SERVER.FILE);
  await DatabaseSetupHelper.updateServerFile(options, serverFilePath);

  // Update package.json with scripts
  DatabaseSetupHelper.updatePackageJson(options, {
    "db:push": "prisma db push --schema=./src/database/schema.prisma",
    "db:migrate": "prisma migrate dev --schema=./src/database/schema.prisma",
    "db:studio": "prisma studio --schema=./src/database/schema.prisma",
    "db:generate": "prisma generate --schema=./src/database/schema.prisma",
  });

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(options);
}

/**
 * Set up Mongoose
 * @param options - Database setup options
 */
async function setupMongoose(options: GeneratorOptions): Promise<void> {
  const { destination, databaseName } = options;

  // Create directories
  DatabaseSetupHelper.createDatabaseDirectories(options);

  // Create config file using AST template
  const configPath = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.DATABASE,
    PATHS.FILES.DATABASE.CONNECTION
  );
  
  // Use AST template processor instead of the regular template
  const configAstPath = getASTTemplatePath(PATHS.FILES.DATABASE.CONNECTION_TEMPLATE_LOC(DATABASE.TYPES.MONGOOSE));
  await writeASTTemplate(
    configAstPath,
    configPath,
    options
  );

  // Create model files using AST template
  const exampleModelPath = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC, 
    PATHS.DIRECTORIES.SRC.MODELS,
    "Example.ts"
  );
  
  // Use AST template processor for the example model
  const modelAstPath = getASTTemplatePath(PATHS.FILES.MODELS.EXAMPLE_TEMPLATE_LOC(DATABASE.TYPES.MONGOOSE));
  await writeASTTemplate(
    modelAstPath,
    exampleModelPath,
    options
  );

  // Update server file
  const serverFilePath = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.FILES.SERVER.FILE);
  await DatabaseSetupHelper.updateServerFile(options, serverFilePath);

  // Setup environment variables
  DatabaseSetupHelper.setupEnvironmentVariables(options);
}

/**
 * Helper function to find the next section marker in .env file
 * @param content - File content
 * @param startPosition - Position to start searching from
 * @returns Position of the next marker or -1 if none found
 */
function findNextSectionMarker(content: string, startPosition: number): number {
  const possibleMarkers = Object.values(TEMPLATES.STRINGS.MARKERS.ENV);
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
/**
 * Update server.ts file to include database initialization
 */
export function updateServerWithDatabaseInit(destination: string): boolean {
	const serverFilePath = path.join(
	  destination,
	  PATHS.DIRECTORIES.ROOT.SRC,
	  PATHS.FILES.SERVER.FILE
	);
  
	if (!fs.existsSync(serverFilePath)) {
	  console.log(
		`Warning: ${PATHS.FILES.SERVER.FILE} not found at: ${serverFilePath}`
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
		  `import { initializeDatabase } from './${PATHS.DIRECTORIES.SRC.DATABASE}/${PATHS.FILES.DATABASE.CONNECTION}';\n` +
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