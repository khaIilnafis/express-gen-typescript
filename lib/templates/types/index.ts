/**
 * Templates domain types
 */
import { TemplateStrings } from "./strings/index.js";
import { Comments } from "./comments/index.js";
import { AuthStructure } from "./auth/index.js";
import { ServerStructure } from "./server/index.js";
import { Errors } from "./errors.js";
/**
 * Type definition for template structure
 */
interface TemplateStructure {
  AUTH: AuthStructure;
  STRINGS: TemplateStrings;
  COMMENTS: Comments;
  SERVER: ServerStructure;
  ERRORS: Errors;
}

export {
  TemplateStructure,
  TemplateStrings,
  Comments,
  AuthStructure,
  ServerStructure,
  Errors,
};
