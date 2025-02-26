/**
 * Main constants export file
 */

// Domain-based exports
import { PROJECT } from "./project/index.js";
import { SERVER } from "./server/index.js";
import { DATABASE } from "./database/index.js";
import { AUTH } from "./auth/index.js";
import { WEBSOCKETS } from "./websockets/index.js";
import { VIEW_ENGINES } from "./viewEngines/index.js";
import { TEMPLATES } from "./templates/index.js";
import { COMMON } from "./common/index.js";
import { BASE_DEPENDENCIES, BASE_DEV_DEPENDENCIES, FEATURE_DEPENDENCIES } from "./dependencies/index.js";
import { APP } from "./app/index.js";
import { ERRORS } from "./errors/index.js";

// Export all domain constants
export { 
  PROJECT, 
  SERVER, 
  DATABASE, 
  AUTH, 
  WEBSOCKETS, 
  VIEW_ENGINES, 
  TEMPLATES, 
  COMMON,
  BASE_DEPENDENCIES,
  BASE_DEV_DEPENDENCIES,
  FEATURE_DEPENDENCIES,
  APP,
  ERRORS,
};
