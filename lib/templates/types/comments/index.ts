import { ControllerComments } from "./controller.js";
import { DatabaseComments } from "./database.js";
import { ServerComments } from "./server.js";

interface Comments {
  CONTROLLER: ControllerComments;
  DATABASE: DatabaseComments;
  SERVER: ServerComments;
}

export { Comments, ControllerComments, DatabaseComments, ServerComments };
