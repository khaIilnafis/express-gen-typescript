import { Routes } from "../../types/routes/index.js";
import { ROUTEPARAMS } from "./params.js";

/**
 * Constants for database prerequisites
 */
export const ROUTES = Object.freeze({
  ROUTEPARAMS,
} as const) satisfies Routes;
