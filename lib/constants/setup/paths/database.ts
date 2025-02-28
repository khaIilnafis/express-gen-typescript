import path from "path";
import { PATHS } from "./index.js";

export interface DatabaseFilePaths {
	CONNECTION: string;
	CONNECTION_TEMPLATE: string;
	CONNECTION_LOC: (destination: string) => string;
	CONNECTION_TEMPLATE_LOC: (db: string) => string;
};

export const DATABASE = Object.freeze({
	CONNECTION: "index.ts",
    CONNECTION_TEMPLATE: "index.ast.ts",
	CONNECTION_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.DATABASE, DATABASE.CONNECTION),
	CONNECTION_TEMPLATE_LOC: (db: string): string =>`${PATHS.DIRECTORIES.SRC.DATABASE}/${db}/${DATABASE.CONNECTION_TEMPLATE}`,
  }as const) satisfies DatabaseFilePaths;