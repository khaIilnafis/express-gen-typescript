export interface DatabaseFilePaths {
  CONNECTION: string;
  CONNECTION_LOC: (destination: string) => string;
  CONNECTION_TEMPLATE_LOC: (db: string) => string;
}
