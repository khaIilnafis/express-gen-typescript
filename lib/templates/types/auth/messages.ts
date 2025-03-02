/**
 * Type definition for authentication error messages
 */
export interface AuthErrorMessages {
  INVALID_CREDENTIALS: string;
  TOKEN_EXPIRED: string;
  TOKEN_INVALID: string;
  TOKEN_MISSING: string;
  UNAUTHORIZED: string;
}

/**
 * Type definition for authentication success messages
 */
export interface AuthSuccessMessages {
  LOGIN_SUCCESS: string;
  LOGOUT_SUCCESS: string;
  TOKEN_REFRESH_SUCCESS: string;
}

/**
 * Type definition for authentication messages
 */
export interface AuthMessages {
  ERROR: AuthErrorMessages;
  SUCCESS: AuthSuccessMessages;
}
