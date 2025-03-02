/**
 * Controller documentation constants
 * These constants are used for documenting the controllers in the generated code
 */

import { ControllerComments } from "../../types/comments/index.js";

/**
 * Example model comment
 */
export const EXAMPLE_MODEL_COMMENT = `*
 * Example model type for demonstration
 `;

/**
 * Get All Controller comment
 */
export const GETALL_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to get all examples
 `;

/**
 * Get By ID Controller comment
 */
export const GETBYID_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to get example by ID
 `;

/**
 * Create Controller comment
 */
export const CREATE_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to create a new example
 `;

/**
 * Update Controller comment
 */
export const UPDATE_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to update an example
 `;

/**
 * Delete Controller comment
 */
export const DELETE_CONTROLLER_COMMENT = `*
 * Factory function that creates a controller to delete an example
 `;

/**
 * Socket IO parameter comment suffix to append when socket.io is enabled
 */
export const SOCKET_PARAM_COMMENT = ` * @param io - Socket server instance (optional)
 `;

/**
 * All controller comments as a structured object
 */
export const CONTROLLER_COMMENTS = Object.freeze({
  EXAMPLE_MODEL: EXAMPLE_MODEL_COMMENT,
  GETALL_CONTROLLER: GETALL_CONTROLLER_COMMENT,
  GETBYID_CONTROLLER: GETBYID_CONTROLLER_COMMENT,
  CREATE_CONTROLLER: CREATE_CONTROLLER_COMMENT,
  UPDATE_CONTROLLER: UPDATE_CONTROLLER_COMMENT,
  DELETE_CONTROLLER: DELETE_CONTROLLER_COMMENT,
  SOCKET_PARAM: SOCKET_PARAM_COMMENT,
} as const) satisfies ControllerComments;
