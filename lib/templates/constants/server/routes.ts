/**
 * Server route handler constants
 * Contains route handler code for different server configurations
 */

import {
  ServerRootRouteHandler,
  ServerViewRouteHandler,
} from "../../types/server/index.js";

/**
 * Root route handler for different view engines
 */
export const ROOT_ROUTE_HANDLER = Object.freeze({
  DEFAULT: "res.json({ message: 'Welcome to the API' });",
} as const) satisfies ServerRootRouteHandler;

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
