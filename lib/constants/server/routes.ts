/**
 * Server route handler constants
 * Contains route handler code for different server configurations
 */

/**
 * Type definition for server root route handler
 */
export interface ServerRootRouteHandler {
  DEFAULT: string;
  VIEW_ENGINE: string;
}

/**
 * Root route handler for different view engines
 */
export const ROOT_ROUTE_HANDLER = Object.freeze({
  DEFAULT: "res.json({ message: 'Welcome to the API' });",
  VIEW_ENGINE: "res.render('index', { title: 'Express TypeScript' });",
} as const) satisfies ServerRootRouteHandler; 