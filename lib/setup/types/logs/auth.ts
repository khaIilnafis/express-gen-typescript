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
