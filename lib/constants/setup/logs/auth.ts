/**
 * Authentication logs constants
 * Contains message strings related to authentication
 */

/**
 * Type definition for authentication error logs
 */
export interface AuthErrorLogs {
	INVALID_CREDENTIALS: string;
	TOKEN_EXPIRED: string;
	TOKEN_INVALID: string;
	TOKEN_MISSING: string;
	UNAUTHORIZED: string;
  }
  
  /**
   * Type definition for authentication success logs
   */
  export interface AuthSuccessLogs {
	LOGIN_SUCCESS: string;
	LOGOUT_SUCCESS: string;
	TOKEN_REFRESH_SUCCESS: string;
  }
  
  /**
   * Type definition for authentication logs
   */
  export interface AuthLogs {
	ERROR: AuthErrorLogs;
	SUCCESS: AuthSuccessLogs;
  }

  /**
 * Application log constants
 */
export const AUTH_LOGS = Object.freeze({
	ERROR: {
		INVALID_CREDENTIALS: "Invalid username or password.",
		TOKEN_EXPIRED: "Authentication token has expired.",
		TOKEN_INVALID: "Invalid authentication token.",
		TOKEN_MISSING: "No authentication token provided.",
		UNAUTHORIZED: "You are not authorized to access this resource.",
	  },
	SUCCESS: {
		LOGIN_SUCCESS: "Successfully logged in.",
		LOGOUT_SUCCESS: "Successfully logged out.",
		TOKEN_REFRESH_SUCCESS: "Token successfully refreshed.",
	}
});