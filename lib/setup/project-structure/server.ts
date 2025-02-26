import fs from "fs";
import path from "path";
import {
  loadTemplate,
  writeTemplate,
  getTemplatePath,
  TemplateVariables,
} from "../../utils/template-loader.js";
import {
  WEBSOCKETS,
  TEMPLATES,
  VIEW_ENGINES,
  DATABASE,
  SERVER,
  PROJECT,
} from "../../constants/index.js";

// Import interface from index.ts
import { ServerGeneratorOptions } from "./index.js";
import { IMPORTS } from "../../constants/server/imports.js";

/**
 * Generate server files (server.ts and server.d.ts)
 * @param destination - Destination directory to generate files in
 * @param options - Server generator options
 * @returns True if server files were generated successfully
 */
export function generateServerFiles(
  destination: string,
  options: ServerGeneratorOptions
): boolean {
  const { database, authentication, websocketLib, viewEngine } = options;

  try {
    // Get template path
    const templatePath = getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.SERVER.MAIN);

    // Load template
    // const template = loadTemplate(templatePath);

    // Configure template variables
    const templateVars: TemplateVariables = {
      baseServerCode: "",
      expressSetup: "",
      imports: "",
      authImports: "",
      websocketImports: "",
      viewImports: "",
      classProperties: "",
      constructorCalls: "",
      middlewareSetup: "",
	  databaseImports: "",
      databaseMethod: "",
      websocketMethod: "",
	  viewPlaceholder: "",
      viewRouteHandler: "",
      // Use the new SERVER constant for router initialization
      socketRouterInit: SERVER.ROUTER_INIT.DEFAULT,
      hasDatabaseMethod: false,
    };

    // Add database imports if selected
    if (database && database !== DATABASE.TYPES.NONE) {
      templateVars.hasDatabaseMethod = true;
	//   templateVars.databaseImports = ((dbType: string) => {
    //     // Type guard to check if key exists in IMPORTS.DATABASE
    //     if (dbType.toUpperCase() in IMPORTS.DATABASE) {
    //       return IMPORTS.DATABASE[dbType.toUpperCase() as keyof typeof IMPORTS.DATABASE];
    //     }
    //     return "";
    //   })(database);
      // Use the new SERVER constant for constructor calls
      templateVars.constructorCalls += SERVER.CONSTRUCTOR_CALLS.DATABASE;
    }

    // Add authentication imports if selected
    if (authentication) {
      // Use the new SERVER constant for auth imports and middleware
      templateVars.authImports = SERVER.IMPORTS.AUTH.PASSPORT;
      templateVars.middlewareSetup += SERVER.MIDDLEWARE.AUTH.PASSPORT;
    }

    // Add WebSocket imports and setup if selected
    if (websocketLib && websocketLib !== WEBSOCKETS.LIBRARIES.NONE) {
      if (websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO) {
        // Use the new SERVER constant for Socket.IO setup
        templateVars.websocketImports = SERVER.IMPORTS.WEBSOCKET.SOCKETIO;
        templateVars.classProperties = SERVER.CLASS_PROPERTIES.SOCKETIO;
        templateVars.constructorCalls += SERVER.CONSTRUCTOR_CALLS.WEBSOCKET;
        templateVars.websocketMethod = SERVER.WEBSOCKET_METHODS.SOCKETIO;
        templateVars.socketRouterInit = SERVER.ROUTER_INIT.SOCKETIO;
      } else if (websocketLib === WEBSOCKETS.LIBRARIES.WS) {
        // Use the new SERVER constant for WebSocket setup
        templateVars.websocketImports = SERVER.IMPORTS.WEBSOCKET.WS;
        templateVars.classProperties = SERVER.CLASS_PROPERTIES.WS;
        templateVars.constructorCalls += SERVER.CONSTRUCTOR_CALLS.WEBSOCKET;
        templateVars.websocketMethod = SERVER.WEBSOCKET_METHODS.WS;
        templateVars.socketRouterInit = SERVER.ROUTER_INIT.WS;
      }
    }

    // Add view engine imports and setup if selected
    if (viewEngine && viewEngine !== VIEW_ENGINES.TYPES.NONE) {
      // Add the appropriate view engine setup
	  templateVars.viewPlaceholder += SERVER.VIEW_ENGINE_SETUP.PLACEHOLDER;
      // Add the view route handler
      templateVars.viewRouteHandler = SERVER.VIEW_ROUTE_HANDLER.WITH_VIEW_ENGINE;
      
      switch (viewEngine) {
        case VIEW_ENGINES.TYPES.EJS:
          templateVars.viewImports = SERVER.IMPORTS.VIEW_ENGINE.EJS;
          break;
        case VIEW_ENGINES.TYPES.PUG:
          templateVars.viewImports = SERVER.IMPORTS.VIEW_ENGINE.PUG;
          break;
        case VIEW_ENGINES.TYPES.HANDLEBARS:
          templateVars.viewImports = SERVER.IMPORTS.VIEW_ENGINE.HANDLEBARS;
          break;
      }
    } else {
      // If no view engine, set an empty view route handler
      templateVars.viewRouteHandler = SERVER.VIEW_ROUTE_HANDLER.NONE;
    }

    // Load and write the server template
    writeTemplate(templatePath, path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.FILES.SERVER.FILE), templateVars);

    // Generate server.d.ts with type declarations
    generateServerTypesFile(destination, options);

    return true;
  } catch (error) {
    console.error("Error generating server files:", error);
    return false;
  }
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
    imports: SERVER.TYPE_DECLARATIONS.BASE_IMPORTS,
    interfaceProperties: "",
  };

  // Add additional imports based on options
  if (options.database === DATABASE.TYPES.PRISMA) {
    templateVars.imports += SERVER.IMPORTS.DATABASE.PRISMA;
    templateVars.interfaceProperties +=
	SERVER.TYPE_DECLARATIONS.INTERFACE_PROPERTIES.PRISMA;
  }

  if (
    options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO ||
    options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO
  ) {
    templateVars.imports += SERVER.IMPORTS.WEBSOCKET.SOCKETIO;
    templateVars.interfaceProperties +=
      SERVER.TYPE_DECLARATIONS.INTERFACE_PROPERTIES.SOCKETIO;
  } else if (
    options.websocketLib === WEBSOCKETS.LIBRARIES.WS ||
    options.websocketLib === WEBSOCKETS.LIBRARIES.WS
  ) {
    templateVars.imports += SERVER.IMPORTS.WEBSOCKET.WS;
    templateVars.interfaceProperties +=
      SERVER.TYPE_DECLARATIONS.INTERFACE_PROPERTIES.WS;
  }

  // Generate server.d.ts content
  let typesContent = templateVars.imports;

  // Add Express namespace augmentation for user in request if authentication is enabled
  if (options.authentication) {
    typesContent += SERVER.TYPE_DECLARATIONS.AUTH_NAMESPACE;
  }

  // Add Server interface
  typesContent += SERVER.TYPE_DECLARATIONS.BASE_INTERFACE;
  typesContent += templateVars.interfaceProperties;
  typesContent += SERVER.TYPE_DECLARATIONS.INTERFACE_CLOSING;

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
  let environmentVariables: string =
    SERVER.TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.BASE;

  // Add database environment variables based on selected database
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
    switch (options.database) {
      case DATABASE.TYPES.SEQUELIZE:
        environmentVariables = `${SERVER.TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.SEQUELIZE}\n${environmentVariables}`;
        break;
      case DATABASE.TYPES.MONGOOSE:
        environmentVariables = `${SERVER.TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.MONGOOSE}\n${environmentVariables}`;
        break;
      case DATABASE.TYPES.PRISMA:
        environmentVariables = `${SERVER.TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.PRISMA}\n${environmentVariables}`;
        break;
      case DATABASE.TYPES.TYPEORM:
        environmentVariables = `${SERVER.TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.DATABASE.TYPEORM}\n${environmentVariables}`;
        break;
    }
  }

  // Add authentication environment variables if authentication is enabled
  if (options.authentication) {
    environmentVariables = `${SERVER.TYPE_DECLARATIONS.ENVIRONMENT_VARIABLES.AUTH}\n${environmentVariables}`;
  }

  // Create the content by replacing the environmentVariables placeholder
  const typesContent = SERVER.TYPE_DECLARATIONS.GLOBAL_DECLARATIONS.replace(
    "{{environmentVariables}}",
    environmentVariables
  );

  // Write types.d.ts file
  const typesFilePath = path.join(destination, "src", "types.d.ts");
  fs.writeFileSync(typesFilePath, typesContent);
}

// Export the module functions
export default {
  generateServerFiles,
  generateServerTypesFile,
  generateGlobalTypesFile,
};
