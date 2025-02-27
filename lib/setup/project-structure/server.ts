import fs from "fs";
import path from "path";
import {
  writeTemplate,
  getTemplatePath,
} from "../../utils/template-loader.js";
import {
  writeASTTemplate,
  getASTTemplatePath,
  ASTTemplateOptions,
} from "../../utils/ast-template-processor.js";
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

/**
 * Generate server files (server.ts and server.d.ts)
 * @param destination - Destination directory to generate files in
 * @param options - Server generator options
 * @returns True if server files were generated successfully
 */
export async function generateServerFiles(
  destination: string,
  options: ServerGeneratorOptions
): Promise<boolean> {
  const { database, authentication, websocketLib, viewEngine, databaseName, dialect } = options;

  try {
    // Convert generator options to AST template options
    const astOptions: ASTTemplateOptions = {
      database: database || "none",
      authentication: Boolean(authentication),
      websocketLib: websocketLib || "none",
      viewEngine: viewEngine || "none",
      databaseName: databaseName || "",
      dialect: dialect || "",
    };

    // Get AST template path
    const astTemplatePath = getASTTemplatePath(TEMPLATES.PROJECT_STRUCTURE.SERVER.MAIN);
    
    // Process and write the AST template
    await writeASTTemplate(
      astTemplatePath,
      path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.FILES.SERVER.FILE),
      astOptions
    );

    // Generate server.d.ts with type declarations
    await generateServerTypesFile(destination, options);

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
async function generateServerTypesFile(
  destination: string,
  options: ServerGeneratorOptions
): Promise<void> {
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

  // Add websocket interface properties
  if (options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO) {
    templateVars.imports += SERVER.IMPORTS.WEBSOCKET.SOCKETIO_TYPES;
    templateVars.interfaceProperties +=
      SERVER.TYPE_DECLARATIONS.INTERFACE_PROPERTIES.SOCKETIO;
  } else if (options.websocketLib === WEBSOCKETS.LIBRARIES.WS) {
    templateVars.imports += SERVER.IMPORTS.WEBSOCKET.WS_TYPES;
    templateVars.interfaceProperties +=
      SERVER.TYPE_DECLARATIONS.INTERFACE_PROPERTIES.WS;
  }

  // Write the server.d.ts file
//   const serverTypesPath = getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.TYPES.GLOBAL);
  
  writeASTTemplate(
    getASTTemplatePath(TEMPLATES.PROJECT_STRUCTURE.TYPES.GLOBAL),
    path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.FILES.GLOBAL.TYPES),
    templateVars
  );
}

/**
 * Generate global.d.ts file with global type definitions
 * @param destination - Project destination directory
 * @param options - User selected options
 */
export function generateGlobalTypesFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  const globalTypesTemplate = getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.TYPES.GLOBAL);
  
  writeTemplate(
    globalTypesTemplate,
    path.join(destination, PROJECT.FILES.GLOBAL.TYPES),
    {}
  );
}

export default {
  generateServerFiles,
  generateGlobalTypesFile,
};
