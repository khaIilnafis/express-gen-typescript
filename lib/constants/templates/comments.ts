/**
 * Server JSDoc comment templates
 * Contains constants for JSDoc comments used in server.ts template
 */

/**
 * Type definition for server comments
 */
export interface ServerComments {
  SERVER_CLASS: string;
  BOOTSTRAP_METHOD: string;
  CONSTRUCTOR_METHOD: string;
  INITIALIZE_MIDDLEWARES: string;
  CONNECT_DATABASE: string;
  INITIALIZE_WEBSOCKETS: string;
  INITIALIZE_ROUTES: string;
  INITIALIZE_ERROR_HANDLING: string;
  LISTEN_METHOD: string;
}

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
  LISTEN_METHOD: LISTEN_METHOD_COMMENT
} as const) satisfies ServerComments; 

/**
 * Controller documentation constants
 * These constants are used for documenting the controllers in the generated code
 */
export interface ControllerComments {
	EXAMPLE_MODEL: string;
	GETALL_CONTROLLER: string;
	GETBYID_CONTROLLER: string;
	CREATE_CONTROLLER: string;
	UPDATE_CONTROLLER: string;
	DELETE_CONTROLLER: string;
	SOCKET_PARAM: string;
  }
/**
 * Example model comment
 */
export const EXAMPLE_MODEL_COMMENT = `*
 * Example model type for demonstration
 `;

/**
 * Get All Controller comment
 */
export const GETALL_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to get all examples
 `;

/**
 * Get By ID Controller comment
 */
export const GETBYID_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to get example by ID
 `;

/**
 * Create Controller comment
 */
export const CREATE_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to create a new example
 `;

/**
 * Update Controller comment
 */
export const UPDATE_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to update an example
 `;

/**
 * Delete Controller comment
 */
export const DELETE_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to delete an example
 `;

/**
 * Socket IO parameter comment suffix to append when socket.io is enabled
 */
export const SOCKET_PARAM_COMMENT = ` * @param io - Socket server instance (optional)
 `; 

/**
 * All controller comments as a structured object
 */
 export const CONTROLLER_COMMENTS = Object.freeze({
	EXAMPLE_MODEL: EXAMPLE_MODEL_COMMENT,
	GETALL_CONTROLLER: GETALL_CONTROLLER_COMMENT,
	GETBYID_CONTROLLER: GETBYID_CONTROLLER_COMMENT,
	CREATE_CONTROLLER: CREATE_CONTROLLER_COMMENT,
	UPDATE_CONTROLLER: UPDATE_CONTROLLER_COMMENT,
	DELETE_CONTROLLER: DELETE_CONTROLLER_COMMENT,
	SOCKET_PARAM: SOCKET_PARAM_COMMENT
  } as const) satisfies ControllerComments; 