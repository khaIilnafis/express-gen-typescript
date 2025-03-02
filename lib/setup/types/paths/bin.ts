export interface BINFilePaths {
  SERVER: string;
  SERVER_TEMPLATE: string;
  SERVER_LOC: (destination: string) => string;
  SERVER_TEMPLATE_LOC: () => string;
}
