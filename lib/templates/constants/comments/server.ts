/**
 * Server JSDoc comment templates
 * Contains constants for JSDoc comments used in server.ts template
 */

import { ServerComments } from "../../types/comments/index.js";

/**
 * Server class comment with Sentry import comment
 */
export const SERVER_CLASS_COMMENT = `*
* The server.
*
* @class Server
`;

/**
 * Bootstrap method comment
 */
export const BOOTSTRAP_METHOD_COMMENT = `*
* Bootstrap the application.
*
* @class Server
* @method bootstrap
* @static
* @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
`;

/**
 * Constructor method comment
 */
export const CONSTRUCTOR_METHOD_COMMENT = `*
* Constructor.
*
* @class Server
* @constructor
`;

/**
 * Initialize middlewares method comment
 */
export const INITIALIZE_MIDDLEWARES_COMMENT = `*
* Initialize application middlewares.
*
* @class Server
* @method initializeMiddlewares
* @private
`;

/**
 * Connect database method comment
 */
export const CONNECT_DATABASE_COMMENT = `*
* Connect to database.
*
* @class Server
* @method connectToDatabase
* @private
`;

/**
 * Initialize WebSockets method comment
 */
export const INITIALIZE_WEBSOCKETS_COMMENT = `*
* Initialize WebSocket server.
*
* @class Server
* @method initializeWebSockets
* @private
`;

/**
 * Initialize routes method comment
 */
export const INITIALIZE_ROUTES_COMMENT = `
* Initialize API routes.
*
* @class Server
* @method initializeRoutes
* @private
`;

/**
 * Initialize error handling method comment
 */
export const INITIALIZE_ERROR_HANDLING_COMMENT = `*
* Initialize error handlers.
*
* @class Server
* @method initializeErrorHandling
* @private
`;

/**
 * Listen method comment
 */
export const LISTEN_METHOD_COMMENT = `*
* Start the server.
*
* @class Server
* @method listen
* @param {number} port The port to listen on
* @public
`;

/**
 * All server comments as a structured object
 */
export const SERVER_COMMENTS = Object.freeze({
  SERVER_CLASS: SERVER_CLASS_COMMENT,
  BOOTSTRAP_METHOD: BOOTSTRAP_METHOD_COMMENT,
  CONSTRUCTOR_METHOD: CONSTRUCTOR_METHOD_COMMENT,
  INITIALIZE_MIDDLEWARES: INITIALIZE_MIDDLEWARES_COMMENT,
  CONNECT_DATABASE: CONNECT_DATABASE_COMMENT,
  INITIALIZE_WEBSOCKETS: INITIALIZE_WEBSOCKETS_COMMENT,
  INITIALIZE_ROUTES: INITIALIZE_ROUTES_COMMENT,
  INITIALIZE_ERROR_HANDLING: INITIALIZE_ERROR_HANDLING_COMMENT,
  LISTEN_METHOD: LISTEN_METHOD_COMMENT,
} as const) satisfies ServerComments;
