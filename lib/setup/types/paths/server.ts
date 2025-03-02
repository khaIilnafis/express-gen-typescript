export interface ServerFilePaths {
  FILE: string;
  TYPES: string;
  FILE_TEMPLATE: string;
  TYPES_TEMPLATE: string;
  FILE_LOC: (destination: string) => string;
  TYPES_LOC: (destination: string) => string;
  FILE_TEMPLATE_LOC: () => string;
  TYPES_TEMPLATE_LOC: () => string;
}
