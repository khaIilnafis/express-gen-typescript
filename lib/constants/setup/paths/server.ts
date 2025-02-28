import path from "path";
import { PATHS } from "./index.js";

export interface ServerFilePaths {
	FILE: string;
	TYPES: string;
	FILE_TEMPLATE: string;
	TYPES_TEMPLATE: string;
	FILE_LOC: (destination: string)=> string;
	TYPES_LOC: (destination: string)=> string;
	FILE_TEMPLATE_LOC: ()=> string;
	TYPES_TEMPLATE_LOC: ()=> string;
  };

  export const SERVER = Object.freeze({
	FILE: "server.ts",
	TYPES: "server.d.ts",
    FILE_TEMPLATE: "server.ast.ts",
	TYPES_TEMPLATE: "server-types.ast.ts",
	FILE_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, SERVER.FILE),
	TYPES_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, SERVER.TYPES),
	FILE_TEMPLATE_LOC: (): string => `${PATHS.DIRECTORIES.ROOT.STRUCTURE}/${SERVER.FILE_TEMPLATE}`,
	TYPES_TEMPLATE_LOC: (): string => `${PATHS.DIRECTORIES.ROOT.STRUCTURE}/${SERVER.TYPES_TEMPLATE}`
  }as const) satisfies ServerFilePaths;