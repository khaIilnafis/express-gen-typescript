/**
 * Server route handler constants
 * Contains route handler code for different server configurations
 */

/**
 * Type definition for server root route handler
 */
export interface ServerRootRouteHandler {
  DEFAULT: string;
}

/**
 * Root route handler for different view engines
 */
export const ROOT_ROUTE_HANDLER = Object.freeze({
  DEFAULT: "res.json({ message: 'Welcome to the API' });",
} as const) satisfies ServerRootRouteHandler; 

/**
 * Type definition for server view route handler
 */
export interface ServerViewRouteHandler {
  NONE: string;
  WITH_VIEW_ENGINE: string;
}

/**
 * View route handler for server
 */
export const VIEW_ROUTE_HANDLER = Object.freeze({
  NONE: "",
  WITH_VIEW_ENGINE: `
    // Handle root route for view engine
    this.app.get('/', (req: Request, res: Response) => {
      res.render('index', { title: 'Express TypeScript' });
    });
  `,
} as const) satisfies ServerViewRouteHandler; 