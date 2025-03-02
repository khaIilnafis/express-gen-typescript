export interface AuthFilePaths {
  CONFIG: (authLib: string, destination: string) => string;
  CONFIG_TEMPLATE: (authLib: string) => string;
  MIDDLEWARE: {
    AUTH: string;
    AUTH_TEMPLATE: string;
  };
}
