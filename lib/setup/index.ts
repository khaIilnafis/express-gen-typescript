/**
 * Main setup module that exports all setup functions
 */

// Import setup modules
import setupProjectStructure from "./project-structure/index.js";
import setupDatabases from "./database/index.js";
import setupAuth from "./auth/index.js";
import setupWebsockets from "./websockets/index.js";
import setupViews from "./views/index.js";

// Export setup functions
const setup = {
  // Main project structure setup
  projectStructure: setupProjectStructure,

  // Database setup
  database: setupDatabases,

  // Auth setup
  auth: setupAuth,

  // Websockets setup
  websockets: setupWebsockets,

  // Views setup
  views: setupViews,
};

export default setup;
