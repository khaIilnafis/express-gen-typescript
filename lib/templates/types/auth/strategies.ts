/**
 * Type definition for Passport.js strategies
 */
export interface PassportStrategies {
  LOCAL: string;
  JWT: string;
  GOOGLE: string;
  FACEBOOK: string;
  GITHUB: string;
}

/**
 * Type definition for authentication strategies
 */
export interface AuthStrategies {
  PASSPORT: PassportStrategies;
}
