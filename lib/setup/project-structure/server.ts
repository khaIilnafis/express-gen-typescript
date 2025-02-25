import fs from "fs";
import path from "path";
import {
  loadTemplate,
  writeTemplate,
  getTemplatePath,
  TemplateVariables,
} from "../../utils/template-loader.js";
import {
  DATABASES,
  WEBSOCKETS,
  TEMPLATES,
  ERRORS,
  APP,
  SERVER_IMPORTS,
  SERVER_CLASS_PROPERTIES,
  SERVER_CONSTRUCTOR_CALLS,
  SERVER_WEBSOCKET_METHODS,
  SERVER_ROUTER_INIT,
  SERVER_VIEW_ENGINE_SETUP,
  SERVER_ROOT_ROUTE_HANDLER,
  SERVER_TYPE_DECLARATIONS,
  VIEW_ENGINES,
  SERVER_AUTH_MIDDLEWARE,
  SERVER_DATABASE_PLACEHOLDER,
} from "../../constants/index.js";

// Import interface from index.ts
import { ServerGeneratorOptions } from "./index.js";

/**
 * Template variables interface for server generation
 */
interface ServerTemplateVars {
  databaseImports: string;
  authImports: string;
  websocketImports: string;
  viewImports: string;
  classProperties: string;
  constructorCalls: string;
  middlewareSetup: string;
  databaseMethod: string;
  websocketMethod: string;
  socketRouterInit: string;
  rootRouteHandler: string;
  [key: string]: any;
}

/**
 * Generate server.ts file with customizations based on user options
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function generateServerFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  const { database, authentication, websocketLib, viewEngine } = options;

  const srcDir = path.join(destination, "src");
  const serverFilePath = path.join(srcDir, "server.ts");

  // Prepare template variables based on selected options
  const templateVars: Record<string, any> = {
    databaseImports: "",
    authImports: "",
    websocketImports: "",
    viewImports: "",
    classProperties: "",
    constructorCalls: "",
    middlewareSetup: "",
    databaseMethod: "",
    websocketMethod: "",
    socketRouterInit: SERVER_ROUTER_INIT.DEFAULT,
  };

  // Add database imports if selected
  if (database && database !== DATABASES.TYPES.NONE) {
    templateVars.databaseMethod = SERVER_DATABASE_PLACEHOLDER;
    templateVars.hasDatabaseMethod = true;
    templateVars.constructorCalls += SERVER_CONSTRUCTOR_CALLS.DATABASE;
  }

  // Add authentication imports if selected
  if (authentication) {
    templateVars.authImports = SERVER_IMPORTS.AUTH.PASSPORT;
    templateVars.middlewareSetup += SERVER_AUTH_MIDDLEWARE.PASSPORT;
  }

  // Add WebSocket imports and setup if selected
  if (websocketLib && websocketLib !== WEBSOCKETS.LIBRARIES.NONE) {
    if (websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO) {
      templateVars.websocketImports = SERVER_IMPORTS.WEBSOCKET.SOCKETIO;
      templateVars.classProperties = SERVER_CLASS_PROPERTIES.SOCKETIO;
      templateVars.constructorCalls += SERVER_CONSTRUCTOR_CALLS.WEBSOCKET;
      templateVars.websocketMethod = SERVER_WEBSOCKET_METHODS.SOCKETIO;
      templateVars.socketRouterInit = SERVER_ROUTER_INIT.SOCKETIO;
    } else if (websocketLib === WEBSOCKETS.LIBRARIES.WS) {
      templateVars.websocketImports = SERVER_IMPORTS.WEBSOCKET.WS;
      templateVars.classProperties = SERVER_CLASS_PROPERTIES.WS;
      templateVars.constructorCalls += SERVER_CONSTRUCTOR_CALLS.WEBSOCKET;
      templateVars.websocketMethod = SERVER_WEBSOCKET_METHODS.WS;
      templateVars.socketRouterInit = SERVER_ROUTER_INIT.WS;
    }
  }

  // Add view engine imports and setup if selected
  if (viewEngine) {
    // Add the appropriate view engine setup
    switch (viewEngine) {
      case VIEW_ENGINES.TYPES.EJS:
        templateVars.viewImports = SERVER_IMPORTS.VIEW_ENGINE.EJS;
        templateVars.middlewareSetup += SERVER_VIEW_ENGINE_SETUP.EJS;
        break;
      case VIEW_ENGINES.TYPES.PUG:
        templateVars.viewImports = SERVER_IMPORTS.VIEW_ENGINE.PUG;
        templateVars.middlewareSetup += SERVER_VIEW_ENGINE_SETUP.PUG;
        break;
      case VIEW_ENGINES.TYPES.HANDLEBARS:
        templateVars.viewImports = SERVER_IMPORTS.VIEW_ENGINE.HANDLEBARS;
        templateVars.middlewareSetup += SERVER_VIEW_ENGINE_SETUP.HANDLEBARS;
        break;
    }
  }

  // Load and write the server template
  const templatePath = getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.SERVER.MAIN);
  writeTemplate(templatePath, serverFilePath, templateVars);

  // Generate server.d.ts with type declarations
  generateServerTypesFile(destination, options);
}

/**
 * Generate server.d.ts file with type declarations based on options
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function generateServerTypesFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  // Create template vars for types file
  const templateVars = {
    imports: SERVER_TYPE_DECLARATIONS.BASE_IMPORTS,
    interfaceProperties: "",
  };

  // Add additional imports based on options
  if (options.database === DATABASES.TYPES.PRISMA) {
    templateVars.imports += SERVER_IMPORTS.DATABASE.PRISMA;
    templateVars.interfaceProperties +=
      SERVER_TYPE_DECLARATIONS.INTERFACE_PROPERTIES.PRISMA;
  }

  if (
    options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO ||
    options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO
  ) {
    templateVars.imports += SERVER_IMPORTS.WEBSOCKET.SOCKETIO;
    templateVars.interfaceProperties +=
      SERVER_TYPE_DECLARATIONS.INTERFACE_PROPERTIES.SOCKETIO;
  } else if (
    options.websocketLib === WEBSOCKETS.LIBRARIES.WS ||
    options.websocketLib === WEBSOCKETS.LIBRARIES.WS
  ) {
    templateVars.imports += SERVER_IMPORTS.WEBSOCKET.WS;
    templateVars.interfaceProperties +=
      SERVER_TYPE_DECLARATIONS.INTERFACE_PROPERTIES.WS;
  }

  // Generate server.d.ts content
  let typesContent = templateVars.imports;

  // Add Express namespace augmentation for user in request if authentication is enabled
  if (options.authentication) {
    typesContent += SERVER_TYPE_DECLARATIONS.AUTH_NAMESPACE;
  }

  // Add Server interface
  typesContent += SERVER_TYPE_DECLARATIONS.BASE_INTERFACE;
  typesContent += templateVars.interfaceProperties;
  typesContent += SERVER_TYPE_DECLARATIONS.INTERFACE_CLOSING;

  // Write server.d.ts file
  const typesFilePath = path.join(destination, "src", "server.d.ts");
  fs.writeFileSync(typesFilePath, typesContent);
}

/**
 * Generate global.d.ts file with environment type declarations
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function generateGlobalTypesFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  // Initialize environment variables with base variables
  let environmentVariables =
    SERVER_TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.BASE;

  // Add database environment variables based on selected database
  if (options.database && options.database !== DATABASES.TYPES.NONE) {
    switch (options.database) {
      case DATABASES.TYPES.SEQUELIZE:
        environmentVariables = `${SERVER_TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.SEQUELIZE}\n${environmentVariables}`;
        break;
      case DATABASES.TYPES.MONGOOSE:
        environmentVariables = `${SERVER_TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.MONGOOSE}\n${environmentVariables}`;
        break;
      case DATABASES.TYPES.PRISMA:
        environmentVariables = `${SERVER_TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.PRISMA}\n${environmentVariables}`;
        break;
      case DATABASES.TYPES.TYPEORM:
        environmentVariables = `${SERVER_TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.TYPEORM}\n${environmentVariables}`;
        break;
    }
  }

  // Add authentication environment variables if authentication is enabled
  if (options.authentication) {
    environmentVariables = `${SERVER_TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.AUTH}\n${environmentVariables}`;
  }

  // Create the content by replacing the environmentVariables placeholder
  const typesContent = SERVER_TYPE_DECLARATIONS.GLOBAL_DECLARATIONS.replace(
    "{{environmentVariables}}",
    environmentVariables
  );

  // Write types.d.ts file
  const typesFilePath = path.join(destination, "src", "types.d.ts");
  fs.writeFileSync(typesFilePath, typesContent);
}

// Export the module functions
export default {
  generateServerFile,
  generateServerTypesFile,
  generateGlobalTypesFile,
};
