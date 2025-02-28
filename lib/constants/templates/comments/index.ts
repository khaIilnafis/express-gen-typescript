import { ControllerComments, CONTROLLER_COMMENTS} from "./controller.js";
import { DatabaseComments, DATABASE_COMMENTS } from "./database.js";
import { ServerComments, SERVER_COMMENTS } from "./server.js";

export interface Comments {
	CONTROLLER: ControllerComments,
	DATABASE: DatabaseComments,
	SERVER: ServerComments
  }

/**
* All server comments as a structured object
*/
export const COMMENTS = Object.freeze({
	CONTROLLER: CONTROLLER_COMMENTS,
	DATABASE: DATABASE_COMMENTS,
	SERVER: SERVER_COMMENTS
   } as const) satisfies Comments;