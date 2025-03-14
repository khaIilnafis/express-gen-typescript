import { DatabaseComments } from "../../types/comments/index.js";

/**
 * Database initialize method comment
 */
export const INITIALIZE_DATBASE_Comment = `*
* Initialize Sequelize connection
* @returns Sequelize instance
* 
`;
/**
 * All database comments as a structured object
 */
export const DATABASE_COMMENTS = Object.freeze({
  INITIALIZE_DATBASE: INITIALIZE_DATBASE_Comment,
} as const) satisfies DatabaseComments;
