import { Comments } from "../../types/comments/index.js";
import { CONTROLLER_COMMENTS } from "./controller.js";
import { DATABASE_COMMENTS } from "./database.js";
import { SERVER_COMMENTS } from "./server.js";

/**
 * All server comments as a structured object
 */
export const COMMENTS = Object.freeze({
  CONTROLLER: CONTROLLER_COMMENTS,
  DATABASE: DATABASE_COMMENTS,
  SERVER: SERVER_COMMENTS,
} as const) satisfies Comments;
