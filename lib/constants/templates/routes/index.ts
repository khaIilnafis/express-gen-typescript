import { ROUTEPARAMS, RouteParams } from "./params.js";

/**
 * Type definition for database prerequisites
 */
export interface Routes {
	ROUTEPARAMS: RouteParams;
  }

  /**
 * Constants for database prerequisites
 */
export const ROUTES = Object.freeze({
	ROUTEPARAMS,
  } as const) satisfies Routes;