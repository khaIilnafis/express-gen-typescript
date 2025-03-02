import { RouteParams } from "../../types/routes/index.js";

/**
 * Constants for route params
 */
export const ROUTEPARAMS = Object.freeze({
  REQUESTFN: "REQUEST",
  RESPONSEFN: "RESPONSE",
  NEXTFN: "NEXT",
} as const) satisfies RouteParams;
