import * as fs from "fs";
import * as path from "path";
import { 
  getASTTemplatePath, 
  writeASTTemplate 
} from "../../utils/ast-template-processor.js";
import {
	LOGS,
  PATHS,
  WEBSOCKETS,
} from "../../constants/index.js";
import { GeneratorOptions } from "../../utils/types.js";

/**
 * Setup websockets based on user selection
 * @param {string} destination - Project destination directory
 * @param {string} websocketLib - Selected websocket library
 */
async function setupWebsockets(
  options: GeneratorOptions
): Promise<void> {
	const {destination, websocketLib} = options;
  // Skip if no websocket library or none was selected
  if (!websocketLib || websocketLib === WEBSOCKETS.LIBRARIES.NONE) {
    return;
  }

  console.log(LOGS.SETUP.WEBSOCKETS(websocketLib));

  // Create necessary directories
  const socketsDir = path.join(
    destination, 
    PATHS.DIRECTORIES.ROOT.SRC, 
    PATHS.DIRECTORIES.SRC.SOCKETS
  );
  
  if (!fs.existsSync(socketsDir)) {
    fs.mkdirSync(socketsDir, { recursive: true });
  }

  // Setup based on selected websocket lib
  switch (websocketLib) {
    case WEBSOCKETS.LIBRARIES.SOCKETIO:
      await setupSocketIO(options);
      break;
    case WEBSOCKETS.LIBRARIES.WS:
      await setupWS(options);
      break;
  }
}

/**
 * Setup Socket.io
 * @param {string} options - Generator Options
 */
async function setupSocketIO(options: GeneratorOptions): Promise<void> {  
  // Create index.ts file for Socket.io using AST template
  await writeASTTemplate(getASTTemplatePath(PATHS.FILES.SOCKETS.INDEX_TEMPLATE_LOC(WEBSOCKETS.LIBRARIES.SOCKETIO)),PATHS.FILES.SOCKETS.INDEX_LOC(options.destination),
    options
  );
  
  console.log(LOGS.SOCKETS.CONFIG.SUCCESS(WEBSOCKETS.LIBRARIES.SOCKETIO));
}

/**
 * Setup WS (ws package)
 * @param {string} options - Generator Options
 */
async function setupWS(options: GeneratorOptions): Promise<void> {
    // Create index.ts file for WS using AST template
  await writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.SOCKETS.INDEX_TEMPLATE_LOC(WEBSOCKETS.LIBRARIES.WS)), 
    PATHS.FILES.SOCKETS.INDEX_LOC(options.destination),
    options
  );
  
  console.log(LOGS.SOCKETS.CONFIG.SUCCESS(WEBSOCKETS.LIBRARIES.WS));
}

export default setupWebsockets;
