import path from "path";
import { PATHS } from "./index.js";

export interface ConfigFilePaths {
	README: string;
	PCKGMGR: string;
	TYPES: string;
	PCKGMGR_TEMPLATE: string;
	TYPES_TEMPLATE: string;
	TYPES_LOC: (destination: string) => string;
	TYPES_TEMPLATE_LOC: () => string;
};

export const CONFIG = Object.freeze({
	README: 'README.md',
	PCKGMGR: 'package.json',
	TYPES: "types.d.ts",
	TYPES_TEMPLATE: "types.ast.ts",
	PCKGMGR_TEMPLATE: 'package.template.json',
	TYPES_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, CONFIG.TYPES),
	TYPES_TEMPLATE_LOC: (): string => `${PATHS.DIRECTORIES.ROOT.STRUCTURE}/${PATHS.FILES.CONFIG.TYPES_TEMPLATE}`
  }as const) satisfies ConfigFilePaths;