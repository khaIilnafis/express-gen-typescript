/**
 * Interface for standardized environment configuration
 */
export interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  LOG_LEVEL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional properties
}
// Generic type for a single library's config.
export type ImportConfig = {
  NAME: string;
  DEFAULT: Record<string, string>;
  NAMED: Record<string, string | string[]>;
};

// Mapped type that converts a LibraryConfig into an ImportLibrary-like type.
export type DerivedImportLibrary<T extends ImportConfig> = {
  NAME: T["NAME"];
  DEFAULT: { [K in keyof T["DEFAULT"]]: string };
  NAMED: { [K in keyof T["NAMED"]]: string | string[] };
};

// Map over entire import configuration object.
export type ImportsFromConfig<T extends Record<string, ImportConfig>> = {
  [K in keyof T]: DerivedImportLibrary<T[K]>;
};

export enum CALLEES {
  THIS,
  NEW,
  BIND,
}

export type ConstructorItem = {
  METHOD: string;
  CALLER: string;
  CALLE: CALLEES;
};
// Mapped type that converts a ConstructorItem into an ConstructorConfig type.
export type ConstructorFromConfig<T extends Record<string, ConstructorItem>> = {
  [K in keyof T]: ConstructorItem;
};
