import {
  writeASTTemplate,
  getASTTemplatePath,
} from "../../utils/templates/ast-template-processor.js";
import { WEBSOCKETS, DATABASE, PATHS } from "../constants/index.js";
import { SERVER } from "../../templates/constants/index.js";
// Import interface from index.ts
import { GeneratorOptions } from "../../types/index.js";

/**
 * Generate server files (server.ts and server.d.ts)
 * @param destination - Destination directory to generate files in
 * @param options - Server generator options
 * @returns True if server files were generated successfully
 */
export async function generateServerFiles(
  options: GeneratorOptions,
): Promise<boolean> {
  try {
    // Process and write the AST template
    await writeASTTemplate(
      getASTTemplatePath(PATHS.FILES.SERVER.FILE_TEMPLATE_LOC()),
      PATHS.FILES.SERVER.FILE_LOC(options.destination),
      options,
    );

    // Generate server.d.ts with type declarations
    // await generateServerTypesFile(options);

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
async function _generateServerTypesFile(
  options: GeneratorOptions,
): Promise<void> {
  // Create template vars for types file
  const templateVars = {
    imports: SERVER.TYPE_DECLARATIONS.BASE_IMPORTS,
    interfaceProperties: "",
  };

  // Add additional imports based on options
  if (options.dialect === DATABASE.TYPES.PRISMA) {
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
  writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.SERVER.TYPES_TEMPLATE_LOC()),
    PATHS.FILES.SERVER.TYPES_LOC(options.destination),
    templateVars,
  );
}

/**
 * Generate global.d.ts file with global type definitions
 * @param destination - Project destination directory
 * @param options - User selected options
 */
export function generateGlobalTypesFile(options: GeneratorOptions): void {
  writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.CONFIG.TYPES_TEMPLATE_LOC()),
    PATHS.FILES.CONFIG.TYPES_LOC(options.destination),
    {},
  );
}

export default {
  generateServerFiles,
  generateGlobalTypesFile,
};
