/**
 * Type definition for JWT configuration
 */
export interface JwtConfig {
  SECRET_LENGTH: number;
  EXPIRATION: {
    ACCESS: number;
    REFRESH: string;
  };
}

/**
 * Type definition for auth configuration
 */
export interface AuthConfig {
  JWT: JwtConfig;
}
