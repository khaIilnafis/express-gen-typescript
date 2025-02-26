/**
 * Template route constants
 * Contains constants for route template file paths
 */

/**
 * Type definition for example auth templates
 */
export interface AuthTemplates {
	CONFIG: string;
  }
/**
 * Type definition for template auth
 */
export interface TemplateAuth {
	PASSPORT: AuthTemplates;
	JWT: AuthTemplates;
	EXPRESS_SESSION: AuthTemplates
  }
  /**
   * Template route constants
   * Defines file paths for route templates
   */
  export const AUTH = Object.freeze({
	PASSPORT: {
		CONFIG: 'auth/passport/passport.ts'
	},
	JWT: {
		CONFIG: 'auth/jwt/index.ts'
	},
	EXPRESS_SESSION: {
		CONFIG: 'auth/express-session/index.ts'
	},
  } as const) satisfies TemplateAuth; 