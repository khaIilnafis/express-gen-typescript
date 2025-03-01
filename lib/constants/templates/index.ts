/**
 * Templates domain constants
 * Organizes and exports template-related constants
 */
import { TEMPLATE_STRINGS, TemplateStrings } from './strings/index.js';
import { COMMENTS, Comments } from './comments/index.js';
import { AUTH, AuthStructure } from './auth/index.js';
import { SERVER, ServerStructure } from './server/index.js';
import { ERRORS, Errors } from './errors.js';
import { IMPORTS } from './imports/index.js';
/**
 * Type definition for template structure
 */
export interface TemplateStructure {
  AUTH: AuthStructure;
  STRINGS: TemplateStrings;
  COMMENTS: Comments;
  SERVER: ServerStructure;
  ERRORS: Errors;
  IMPORTS: typeof IMPORTS
}

// Re-export individual template constants
 export { TEMPLATE_STRINGS,COMMENTS};

/**
 * Combined template constants
 */
export const TEMPLATES = Object.freeze({
	AUTH,
	STRINGS: TEMPLATE_STRINGS,
	COMMENTS,
	SERVER,
	ERRORS,
	IMPORTS
} as const) satisfies TemplateStructure; 