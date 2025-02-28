import path from "path";
import { PATHS } from "./index.js";

export interface BINFilePaths {
	SERVER: string;
	SERVER_TEMPLATE: string;
	SERVER_LOC: (destination: string) => string;
	SERVER_TEMPLATE_LOC: () => string;
  };

  export const BIN = Object.freeze({
	SERVER: 'www.ts',
	SERVER_TEMPLATE: 'www.ast.ts',
	SERVER_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.BIN, BIN.SERVER),
	SERVER_TEMPLATE_LOC: ():string => `${PATHS.DIRECTORIES.ROOT.STRUCTURE}/${PATHS.DIRECTORIES.ROOT.BIN}/${BIN.SERVER_TEMPLATE}`
  }as const) satisfies BINFilePaths;