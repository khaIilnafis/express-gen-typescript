export interface SocketFilePaths {
  INDEX: string;
  IMPORTS: string;
  HANDLER: string;
  INDEX_TEMPLATE: string;
  INDEX_LOC: (destination: string) => string;
  INDEX_TEMPLATE_LOC: (socketLib: string) => string;
}
