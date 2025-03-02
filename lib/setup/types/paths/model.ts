export interface ModelFilePaths {
  EXAMPLE: string;
  INDEX: string;
  EXAMPLE_TEMPLATE: string;
  INDEX_TEMPLATE: string;
  EXAMPLE_LOC: (destination: string, entity?: boolean) => string;
  INDEX_LOC: (destination: string) => string;
  INIT_LOC: (destination: string, orm: string) => string;
  INIT_TEMPLATE_LOC: (orm: string) => string;
  EXAMPLE_TEMPLATE_LOC: (orm: string) => string;
  INDEX_TEMPLATE_LOC: (orm: string) => string;
}
