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
  normalizeDatabaseName,
} from "../../utils/database-helper.js";
import { createEnvFile } from "../../utils/config-helper.js";
import {
	PROJECT,
  TEMPLATES,
  COMMON,
  DATABASE,
  WEBSOCKETS,
  VIEW_ENGINES,
  APP,
  AUTH,
  SERVER,
} from "../../constants/index.js";
import setupViewEngine from "../views/index.js";
import setupWebsockets from "../websockets/index.js";
/**
 * Options for project structure setup
 */
export interface ProjectSetupOptions {
  database?: string;
  databaseName?: string;
  dialect?: string;
  authentication?: boolean;
  websocketLib?: string;
  viewEngine?: string;
  [key: string]: any;
}

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
  destination: string,
  options: ProjectSetupOptions
): Promise<void> {
  console.log(COMMON.MESSAGES.SETUP.PROJECT_STRUCTURE);

  // Create core directories
  createCoreDirectories(destination);

  // Create .env file with appropriate environment variables
  createEnvironmentFile(destination, options);

  // Create server.ts and type files
  // Prepare options for server generator with required properties
  const serverOptions: ServerGeneratorOptions = {
    database: options.database || DATABASE.TYPES.NONE,
    authentication: Boolean(options.authentication),
    websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE,
    viewEngine: options.viewEngine || VIEW_ENGINES.TYPES.NONE,
    databaseName: options.databaseName,
    dialect: options.dialect,
    ...options,
  };

  // Generate server files
  await serverGenerator.generateServerFiles(destination, serverOptions);
//   await serverGenerator.generateGlobalTypesFile(destination, serverOptions);

  // Create bin directory with startup files
  createBinFiles(destination);

  // Setup authentication if enabled
  if (options.authentication) {
    await setupPassport(destination);
  }

  // Setup database config and models
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
    await setupDatabaseConfig(destination, options.database, options);
  }

  // Setup websockets if enabled
  if (
    options.websocketLib &&
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
  ) {
    await setupWebsocketsConfig(destination, options.websocketLib);
  }

  // Setup views if enabled
  if (options.viewEngine && options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    await setupViewsConfig(destination, options.viewEngine);
  }

  // Create basic routes structure
  setupRoutesStructure(destination, options);

  // Create README.md file
  createReadme(destination, options);
}

/**
 * Create binary files for the project
 * @param destination - Project destination directory
 */
function createBinFiles(destination: string): void {
  const binDir = path.join(destination, PROJECT.DIRECTORIES.ROOT.BIN);

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
  }

  // Create www.ts file using AST template
  const wwwPath = path.join(binDir, PROJECT.FILES.BIN.SERVER);
  
  // Use AST template if available
  try {
    // Use the AST template processor
    writeASTTemplate(
      getASTTemplatePath(TEMPLATES.PROJECT_STRUCTURE.BIN.WWW),
      wwwPath,
      {}
    );
  } catch (error) {
    // Fallback to regular template if AST template fails
    console.warn("AST template failed, falling back to regular template:", error);
    writeTemplate(getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.BIN.WWW), wwwPath);
  }
}

/**
 * Create core project directories
 * @param destination - Project destination directory
 */
function createCoreDirectories(destination: string): void {
  const { ROOT, SRC, PUBLIC } = PROJECT.DIRECTORIES;

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
  destination: string,
  database: string,
  options: ProjectSetupOptions = {}
): Promise<void> {
  // Skip if no database or none was selected
  if (!database || database === DATABASE.TYPES.NONE) {
    return;
  }

  console.log(`${COMMON.MESSAGES.SETUP.DATABASE(database)}`);

  // Check if database setup is already in progress (flag set by database-setup-helper.ts)
  if ((global as any).databaseSetupInProgress) {
    console.log(
      "Database setup already in progress, skipping from project structure setup"
    );
    return;
  }

  // Use the database setup module with all necessary options
  await setupDatabase({
    destination,
    database,
    databaseName:
      options.databaseName || normalizeDatabaseName(path.basename(destination)),
    ...options,
  });

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
  
  console.log(COMMON.MESSAGES.SETUP.WEBSOCKETS(websocketLib));
  
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
  console.log(COMMON.MESSAGES.SETUP.VIEW_ENGINE(viewEngine));
  
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
function setupRoutesStructure(destination: string, options: ProjectSetupOptions): void {
  const { ROOT, SRC } = PROJECT.DIRECTORIES;

  const routesDir = path.join(destination, ROOT.SRC, SRC.ROUTES);
  const controllersDir = path.join(destination, ROOT.SRC, SRC.CONTROLLERS);
  const exampleControllerDir = path.join(controllersDir, TEMPLATES.STRINGS.EXAMPLE_FILE.FILENAME);

  // Create example controller directory if it doesn't exist
  if (!fs.existsSync(exampleControllerDir)) {
    fs.mkdirSync(exampleControllerDir, { recursive: true });
  }

  // Create main controllers index file
  const controllersIndexPath = path.join(controllersDir, PROJECT.FILES.CONTROLLERS.INDEX);
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(TEMPLATES.CONTROLLERS.INDEX),
    controllersIndexPath,
    {} // No specific options needed for the controllers index
  );

  // Create index router if it doesn't exist
  const indexRouterPath = path.join(routesDir, PROJECT.FILES.ROUTES.INDEX);
  if (!fs.existsSync(indexRouterPath)) {
    // Use AST template for index router
    const astOptions = {
      websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE,
      viewEngine: options.viewEngine || VIEW_ENGINES.TYPES.NONE
    };
    
    // Process and write the AST template
    writeASTTemplate(
      getASTTemplatePath(TEMPLATES.ROUTES.INDEX),
      indexRouterPath,
      astOptions
    );
  }

  // Create example routes using AST template
  const exampleRoutesPath = path.join(routesDir, PROJECT.FILES.ROUTES.EXAMPLE);
  // Define AST options for example routes
  const exampleRoutesAstOptions = {
    websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE,
    authentication: Boolean(options.authentication)
  };
  
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(TEMPLATES.ROUTES.EXAMPLE),
    exampleRoutesPath,
    exampleRoutesAstOptions
  );

  // Create example controller files
  const exampleControllerIndexPath = path.join(
    exampleControllerDir,
    PROJECT.FILES.CONTROLLERS.INDEX
  );
  
  // Use AST template for example controller index
  const exampleControllerIndexAstOptions = {
    websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE
  };
  
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(TEMPLATES.CONTROLLERS.EXAMPLE.INDEX),
    exampleControllerIndexPath,
    exampleControllerIndexAstOptions
  );

  // Create example controller using AST template
  const exampleControllerLogicPath = path.join(
    exampleControllerDir,
    PROJECT.FILES.CONTROLLERS.EXAMPLE
  );
  
  // Process and write the AST template
  writeASTTemplate(
    getASTTemplatePath(TEMPLATES.CONTROLLERS.EXAMPLE.CONTROLLER),
    exampleControllerLogicPath,
    exampleControllerIndexAstOptions // No specific options needed for the example controller
  );
}

/**
 * Create README.md file
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function createReadme(destination: string, options: ProjectSetupOptions): void {
  const readmePath = path.join(destination, PROJECT.FILES.COMMON.README);

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
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
    templateVars.databaseName = options.database;
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
    templateVars.websocketDirs += `${PROJECT.DIRECTORIES.SRC.SOCKETS}/          ${TEMPLATES.STRINGS.DIRECTORY_DESCRIPTIONS.WEBSOCKETS}\n`;
  }
  
  if (options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    templateVars.websocketDirs += `${PROJECT.DIRECTORIES.SRC.VIEWS}/            ${TEMPLATES.STRINGS.DIRECTORY_DESCRIPTIONS.VIEWS}\n`;
  }

  // Add database prerequisites based on selected database
  if (options.database === DATABASE.TYPES.MONGOOSE) {
    templateVars.databasePrereqs += `${TEMPLATES.STRINGS.DATABASE_PREREQUISITES.MONGODB}\n`;
  } else if (options.database === DATABASE.TYPES.TYPEORM || options.database === DATABASE.TYPES.PRISMA) {
    templateVars.databasePrereqs += `${TEMPLATES.STRINGS.DATABASE_PREREQUISITES.POSTGRES}\n`;
  } else if (options.database === DATABASE.TYPES.SEQUELIZE) {
    templateVars.databasePrereqs += `${TEMPLATES.STRINGS.DATABASE_PREREQUISITES.MYSQL}\n`;
  }

  // Add database environment variables section
  const dbName = options.databaseName || 
    getDefaultDatabaseName(path.basename(destination), options.database || DATABASE.TYPES.NONE);
  
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
    const dbEnvVars = getDatabaseEnvVars(options.database, dbName);
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
    getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.README),
    readmePath,
    templateVars
  );
  console.log(COMMON.MESSAGES.SUCCESS.README);
}

/**
 * Create .env file with environment variables based on project options
 * @param destination - Project destination directory
 * @param options - Project setup options
 */
function createEnvironmentFile(
  destination: string,
  options: ProjectSetupOptions
): void {
  console.log(COMMON.MESSAGES.SETUP.ENV_FILE);

  // Start with default environment variables
  const envVars: Record<string, string> = {
    PORT: APP.DEFAULTS.PORT.toString(),
    NODE_ENV: APP.ENV.DEVELOPMENT,
  };

  // Add database-specific environment variables
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
    const dbName = options.databaseName ||
      getDefaultDatabaseName(path.basename(destination), options.database);
    
    // Use the utility function to get standardized database env vars
    const dbEnvVars = getDatabaseEnvVars(options.database, dbName);
    Object.assign(envVars, dbEnvVars);
  }

  // Add authentication environment variables if needed
  if (options.authentication) {
    envVars.JWT_SECRET = TEMPLATES.STRINGS.ENV_FILE.JWT_SECRET_KEY;
    envVars.JWT_EXPIRES_IN = AUTH.CONFIG.JWT.EXPIRATION.ACCESS;
  }

  // Create the .env file using the utility function
  createEnvFile(destination, envVars);

  // Create a .env.example file with placeholders for secrets
  const envExamplePath = path.join(destination, TEMPLATES.STRINGS.ENV_FILE.EXAMPLE_FILENAME);
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
