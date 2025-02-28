/**
 * Main constants export file
 */

// Domain-based exports
import { SETUP } from "./setup/index.js";
import { TEMPLATES } from "./templates/index.js";

import { APP } from "./setup/app/index.js";
import { PATHS } from "./setup/paths/index.js";
import { DEPENDENCIES } from "./setup/dependencies/index.js";
import { LOGS } from "./setup/index.js";
import { WEBSOCKETS } from "./setup/websockets/index.js";
import { VIEW_ENGINES } from "./setup/viewEngines/index.js";

import { SERVER } from "./templates/server/index.js";
import { DATABASE } from "./setup/database/index.js";
import { AUTH } from "./templates/auth/index.js";



// Export all domain constants
export { 
	SETUP,
	TEMPLATES, 
	APP,
	PATHS,
	DEPENDENCIES,
	LOGS,
	WEBSOCKETS, 
	VIEW_ENGINES, 
  	SERVER, 
  	DATABASE, 
  	AUTH, 

};
