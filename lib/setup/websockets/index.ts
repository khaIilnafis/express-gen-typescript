import * as fs from "fs";
import * as path from "path";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import {
  PROJECT,
  TEMPLATES,
  WEBSOCKETS,
  COMMON
} from "../../constants/index.js";

/**
 * Setup websockets based on user selection
 * @param {string} destination - Project destination directory
 * @param {string} websocketLib - Selected websocket library
 */
async function setupWebsockets(
  destination: string,
  websocketLib: string
): Promise<void> {
  // Skip if no websocket library or none was selected
  if (!websocketLib || websocketLib === WEBSOCKETS.LIBRARIES.NONE) {
    return;
  }

  console.log(COMMON.MESSAGES.SETUP.WEBSOCKETS(websocketLib));

  // Create necessary directories
  const socketsDir = path.join(
    destination, 
    PROJECT.DIRECTORIES.ROOT.SRC, 
    PROJECT.DIRECTORIES.SRC.SOCKETS
  );
  
  if (!fs.existsSync(socketsDir)) {
    fs.mkdirSync(socketsDir, { recursive: true });
  }

  // Setup based on selected websocket lib
  switch (websocketLib) {
    case WEBSOCKETS.LIBRARIES.SOCKETIO:
      await setupSocketIO(destination);
      break;
    case WEBSOCKETS.LIBRARIES.WS:
      await setupWS(destination);
      break;
  }
}

/**
 * Setup Socket.io
 * @param {string} destination - Project destination directory
 */
async function setupSocketIO(destination: string): Promise<void> {
  const socketsDir = path.join(
    destination, 
    PROJECT.DIRECTORIES.ROOT.SRC, 
    PROJECT.DIRECTORIES.SRC.SOCKETS
  );
  
  // Create index.ts file for Socket.io
  const socketIndexPath = path.join(socketsDir, PROJECT.FILES.SOCKETS.INDEX);
  writeTemplate(
    getTemplatePath(TEMPLATES.WEBSOCKETS.SOCKETIO.INDEX),
    socketIndexPath
  );
  
  console.log("Socket.io setup completed");
}

/**
 * Setup WS (ws package)
 * @param {string} destination - Project destination directory
 */
async function setupWS(destination: string): Promise<void> {
  const socketsDir = path.join(
    destination, 
    PROJECT.DIRECTORIES.ROOT.SRC, 
    PROJECT.DIRECTORIES.SRC.SOCKETS
  );
  
  // Create index.ts file for WS
  const wsIndexPath = path.join(socketsDir, PROJECT.FILES.SOCKETS.INDEX);
  writeTemplate(
    getTemplatePath(TEMPLATES.WEBSOCKETS.WS.INDEX), 
    wsIndexPath
  );
  
  console.log("WS setup completed");
}

export default setupWebsockets;
