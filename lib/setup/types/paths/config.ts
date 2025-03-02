export interface ConfigFilePaths {
  README: string;
  PCKGMGR: string;
  TYPES: string;
  PCKGMGR_TEMPLATE: string;
  TYPES_TEMPLATE: string;
  TYPES_LOC: (destination: string) => string;
  TYPES_TEMPLATE_LOC: () => string;
}
