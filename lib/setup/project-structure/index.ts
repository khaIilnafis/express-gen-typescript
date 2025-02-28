import fs from "fs";
import path from "path";
import serverGenerator from "./server.js";
import setupPassport from "../auth/passport.js";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import { writeASTTemplate, getASTTemplatePath } from "../../utils/ast-template-processor.js";
import setupDatabase from "../database/index.js";
import {
  getDefaultDatabaseName,
  getDatabaseEnvVars,
} from "../database/database-setup-helper.js";
import { createEnvFile } from "../../utils/config-helper.js";
import {
  TEMPLATES,
  DATABASE,
  WEBSOCKETS,
  VIEW_ENGINES,
  APP,
  AUTH,
  LOGS,
  PATHS
} from "../../constants/index.js";
import setupViewEngine from "../views/index.js";
import setupWebsockets from "../websockets/index.js";
import { GeneratorOptions } from "../../utils/types.js";
import { error } from "console";

/**
 * Server generator parameters expected structure
 */
export interface ServerGeneratorOptions {
  database: string;
  authentication: boolean;
  websocketLib: string;
  viewEngine: string;
  [key: string]: any;
}

/**
 * Setup project structure based on user options
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupProjectStructure(
  options: GeneratorOptions
): Promise<void> {
  console.log(LOGS.SETUP.PROJECT_STRUCTURE);

  // Create core directories
  createCoreDirectories(options.destination);

  // Create .env file with appropriate environment variables
  createEnvironmentFile(options);

  // Create server.ts and type files
  // Generate server files
  await serverGenerator.generateServerFiles(options);
//   await serverGenerator.generateGlobalTypesFile(destination, serverOptions);

  // Create bin directory with startup files
  createBinFiles(options.destination, options);

  // Setup authentication if enabled
  if (options.authentication) {
    await setupPassport(options.destination);
  }

  // Setup database config and models
  if (options.database) {
    await setupDatabaseConfig(options);
  }

  // Setup websockets if enabled
  if (
    options.websocketLib &&
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
  ) {
    await setupWebsocketsConfig(options.destination, options.websocketLib);
  }

  // Setup views if enabled
  if (options.viewEngine && options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    await setupViewsConfig(options.destination, options.viewEngine);
  }

  // Create basic routes structure
  setupRoutesStructure(options);

  // Create README.md file
  createReadme(options);
}

/**
 * Create binary files for the project
 * @param destination - Project destination directory
 */
function createBinFiles(destination: string, options: GeneratorOptions): void {
  const binDir = path.join(destination, PATHS.DIRECTORIES.ROOT.BIN);

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
  }
  // Use AST template if available
  try {
    // Use the AST template processor
    writeASTTemplate(
      getASTTemplatePath(PATHS.FILES.BIN.SERVER_TEMPLATE_LOC()),
      PATHS.FILES.BIN.SERVER_LOC(destination),
      options
    );
  } catch (error) {
    // Fallback to regular template if AST template fails
    console.warn("AST template failed:", error);
  }
}

/**
 * Create core project directories
 * @param destination - Project destination directory
 */
function createCoreDirectories(destination: string): void {
  const { ROOT, SRC, PUBLIC } = PATHS.DIRECTORIES;

  // Define all directories to create
  const directories = [
    SRC.CONTROLLERS,
    SRC.MODELS,
    SRC.PUBLIC,
    `${SRC.PUBLIC}/${PUBLIC.CSS}`,
    `${SRC.PUBLIC}/${PUBLIC.JS}`,
    `${SRC.PUBLIC}/${PUBLIC.IMAGES}`,
    SRC.ROUTES,
    SRC.SERVICES,
    SRC.SOCKETS,
    SRC.UTILS,
    SRC.TYPES,
    SRC.CONFIG,
    SRC.MIDDLEWARE,
    SRC.MIGRATIONS,
    SRC.DATABASE,
    SRC.VIEWS,
  ];

  // Create directories
  directories.forEach((dir) => {
    const dirPath = path.join(destination, ROOT.SRC, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

/**
 * Setup database configuration and models
 * @param destination - Project destination directory
 * @param database - Selected database type
 * @param options - User selected options
 */
async function setupDatabaseConfig(
  options: GeneratorOptions
): Promise<void> {
  // Skip if no database or none was selected
  if (!options.database) {
    return;
  }
  // Use the database setup module with all necessary options
  await setupDatabase(options);

  console.log("Completed database setup from project structure setup");
}

/**
 * Setup websockets configuration
 * @param destination - Project destination directory
 * @param websocketLib - Selected websocket library
 */
async function setupWebsocketsConfig(
  destination: string,
  websocketLib: string
): Promise<void> {
  // Skip if no websocket library or none was selected
  if (!websocketLib || websocketLib === WEBSOCKETS.LIBRARIES.NONE) {
    return;
  }
  
  console.log(LOGS.SETUP.WEBSOCKETS(websocketLib));
  
  // Use the dedicated websockets setup
  await setupWebsockets(destination, websocketLib);
}

/**
 * Setup views configuration
 * @param destination - Project destination directory
 * @param viewEngine - Selected view engine
 */
async function setupViewsConfig(
  destination: string,
  viewEngine: string
): Promise<void> {
  // Skip if no view engine or none was selected
  if (!viewEngine || viewEngine === VIEW_ENGINES.TYPES.NONE) {
    return;
  }
  console.log(LOGS.SETUP.VIEW_ENGINE(viewEngine));
  
  // Use the dedicated view engine setup
  await setupViewEngine(destination, viewEngine, {
    appName: path.basename(destination)
  });
}

/**
 * Setup basic routes structure
 * @param destination - Project destination directory
 * @param options - Project setup options including websocketLib and viewEngine
 */
function setupRoutesStructure(options: GeneratorOptions): void {
  const { ROOT, SRC } = PATHS.DIRECTORIES;

  const routesDir = path.join(options.destination, ROOT.SRC, SRC.ROUTES);
  const controllersDir = path.join(options.destination, ROOT.SRC, SRC.CONTROLLERS);
  const exampleControllerDir = path.join(controllersDir, TEMPLATES.STRINGS.EXAMPLE_FILE.FILENAME);

  // Create example controller directory if it doesn't exist
  if (!fs.existsSync(exampleControllerDir)) {
    fs.mkdirSync(exampleControllerDir, { recursive: true });
  }

  // Create main controllers index file
  const controllersIndexPath = path.join(controllersDir, PATHS.FILES.CONTROLLERS.INDEX);
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.CONTROLLERS.INDEX_TEMPLATE_LOC(false)),
    PATHS.FILES.CONTROLLERS.INDEX_LOC(options.destination, false),
    {} // No specific options needed for the controllers index
  );

  	// Create index router if it doesn't exist
    // Use AST template for index router
    const astOptions = {
      websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE,
    //   viewEngine: options.viewEngine || VIEW_ENGINES.TYPES.NONE
    };
	console.log(astOptions);
    // Process and write the AST template
    writeASTTemplate(
      getASTTemplatePath(PATHS.FILES.ROUTES.INDEX_TEMPLATE_LOC()),
      PATHS.FILES.ROUTES.INDEX_LOC(options.destination),
      astOptions
    );

  // Create example routes using AST template
  // Define AST options for example routes
  const exampleRoutesAstOptions = {
    websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE,
    authentication: Boolean(options.authentication)
  };
  
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.ROUTES.EXAMPLE_TEMPLATE_LOC()),
    PATHS.FILES.ROUTES.EXAMPLE_LOC(options.destination),
    exampleRoutesAstOptions
  );

  // Create example controller files
//   const exampleControllerIndexPath = path.join(
//     exampleControllerDir,
//     PROJECT.FILES.CONTROLLERS.INDEX
//   );
  
//   // Use AST template for example controller index
  const exampleControllerIndexAstOptions = {
    websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE
  };
  
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.CONTROLLERS.INDEX_TEMPLATE_LOC(true)),
    PATHS.FILES.CONTROLLERS.INDEX_LOC(options.destination,true),
    exampleControllerIndexAstOptions
  );

  // Create example controller using AST template
//   const exampleControllerLogicPath = path.join(
//     exampleControllerDir,
//     PROJECT.FILES.CONTROLLERS.EXAMPLE
//   );
  
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.CONTROLLERS.EXAMPLE_TEMPLATE_LOC()),
    PATHS.FILES.CONTROLLERS.EXAMPLE_LOC(options.destination),
    exampleControllerIndexAstOptions 
  );
}

/**
 * Create README.md file
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function createReadme(options: GeneratorOptions): void {
  const readmePath = path.join(options.destination, PATHS.FILES.CONFIG.README);
  // Default values
  const templateVars: Record<string, string> = {
    databaseName: DATABASE.TYPES.NONE,
    authEnabled: options.authentication ? "enabled" : "disabled",
    websocketLib: WEBSOCKETS.LIBRARIES.NONE,
    viewEngine: VIEW_ENGINES.TYPES.NONE,
    websocketDirs: "",
    databasePrereqs: "",
    databaseEnvVars: "",
    authEnvVars: ""
  };

  // Set database name if available
  if (options.database) {
    templateVars.databaseName = options.databaseName!;
  }

  // Set websocket library if available
  if (options.websocketLib && options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE) {
    templateVars.websocketLib = options.websocketLib;
  }

  // Set view engine if available
  if (options.viewEngine && options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    templateVars.viewEngine = options.viewEngine;
  }

  // Add websocket and view directories to structure section if needed
  if (options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE) {
    templateVars.websocketDirs += `${PATHS.DIRECTORIES.SRC.SOCKETS}/          ${TEMPLATES.STRINGS.DIRECTORY_DESCRIPTIONS.WEBSOCKETS}\n`;
  }
  
  if (options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    templateVars.websocketDirs += `${PATHS.DIRECTORIES.SRC.VIEWS}/            ${TEMPLATES.STRINGS.DIRECTORY_DESCRIPTIONS.VIEWS}\n`;
  }

  // Add database prerequisites based on selected database
  if (options.dialect === DATABASE.TYPES.MONGOOSE) {
    templateVars.databasePrereqs += `${TEMPLATES.STRINGS.DATABASE_PREREQUISITES.MONGODB}\n`;
  } else if (options.dialect === DATABASE.TYPES.TYPEORM || options.dialect === DATABASE.TYPES.PRISMA) {
    templateVars.databasePrereqs += `${TEMPLATES.STRINGS.DATABASE_PREREQUISITES.POSTGRES}\n`;
  } else if (options.dialect === DATABASE.TYPES.SEQUELIZE) {
    templateVars.databasePrereqs += `${TEMPLATES.STRINGS.DATABASE_PREREQUISITES.MYSQL}\n`;
  }


  
  if (options.database) {
	if(!options.dialect){ throw error }
	  // Add database environment variables section
	  const dbName = options.databaseName || 
	  getDefaultDatabaseName(path.basename(options.destination), options.dialect);
    const dbEnvVars = getDatabaseEnvVars(options.dialect, dbName);
    templateVars.databaseEnvVars = Object.entries(dbEnvVars)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n") + "\n";
  }

  // Add authentication environment variables if needed
  if (options.authentication) {
    templateVars.authEnvVars = `${TEMPLATES.STRINGS.ENV_FILE.JWT_ENV_TEMPLATE}\n${TEMPLATES.STRINGS.ENV_FILE.JWT_EXPIRES_IN}\n`;
  }

  // Create README using template
  writeTemplate(
    getTemplatePath(path.join(PATHS.DIRECTORIES.ROOT.STRUCTURE, PATHS.FILES.CONFIG.README)),
    readmePath,
    templateVars
  );
  console.log(LOGS.SETUP.SUCCESS.README);
}

/**
 * Create .env file with environment variables based on project options
 * @param destination - Project destination directory
 * @param options - Project setup options
 */
function createEnvironmentFile(
  options: GeneratorOptions
): void {
  console.log(LOGS.SETUP.ENV_FILE);
  // Start with default environment variables
  const envVars: Record<string, string | number> = {
    PORT: APP.DEFAULTS.PORT.toString(),
    NODE_ENV: APP.ENV.DEVELOPMENT,
  };

  // Add database-specific environment variables
  if (options.database) {
	if(!options.dialect){ throw error }
    const dbName = options.databaseName ||
      getDefaultDatabaseName(path.basename(options.destination), options.dialect);
    
    // Use the utility function to get standardized database env vars
    const dbEnvVars = getDatabaseEnvVars(options.dialect, dbName);
    Object.assign(envVars, dbEnvVars);
  }

  // Add authentication environment variables if needed
  if (options.authentication) {
    envVars.JWT_SECRET = TEMPLATES.STRINGS.ENV_FILE.JWT_SECRET_KEY;
    envVars.JWT_EXPIRES_IN = AUTH.CONFIG.JWT.EXPIRATION.ACCESS;
  }

  // Create the .env file using the utility function
  createEnvFile(options.destination, envVars);

  // Create a .env.example file with placeholders for secrets
  const envExamplePath = path.join(options.destination, TEMPLATES.STRINGS.ENV_FILE.EXAMPLE_FILENAME);
  const envExampleContent = Object.entries(envVars)
    .map(([key, value]) => {
      // Replace actual secrets with placeholders in the example
      if (key === "JWT_SECRET") {
        return `${key}=${TEMPLATES.STRINGS.ENV_FILE.JWT_PLACEHOLDER}`;
      }
      return `${key}=${value}`;
    })
    .join("\n");

  fs.writeFileSync(envExamplePath, envExampleContent, "utf8");
}

export default setupProjectStructure;
