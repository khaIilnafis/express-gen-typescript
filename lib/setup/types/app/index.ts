/**
 * App domain types/interfaces
 */

export interface AppStructure {
  DEFAULTS: DEFAULTS;
  ENV: ENV;
}
interface DEFAULTS {
  PORT: number;
  ENV: string;
  LOG_LEVEL: string;
}
interface ENV {
  DEVELOPMENT: string;
  PRODUCTION: string;
  TEST: string;
}
