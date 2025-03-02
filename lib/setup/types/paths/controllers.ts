export interface ControllersFilePaths {
  EXAMPLE: string;
  INDEX: string;
  EXAMPLE_TEMPLATE: string;
  INDEX_TEMPLATE: string;
  EXAMPLE_LOC: (destination: string) => string;
  INDEX_LOC: (destination: string, base: boolean) => string;
  EXAMPLE_TEMPLATE_LOC: () => string;
  INDEX_TEMPLATE_LOC: (base: boolean) => string;
}
