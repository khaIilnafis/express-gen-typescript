/**
 * Type definition for route params
 */
export interface RouteParams {
	REQUESTFN: string;
	RESPONSEFN: string;
	NEXTFN: string;
  }

  /**
 * Constants for route params
 */
export const ROUTEPARAMS = Object.freeze({
	REQUESTFN: "REQUEST",
	RESPONSEFN: "RESPONSE",
	NEXTFN: "NEXT",
  } as const) satisfies RouteParams;