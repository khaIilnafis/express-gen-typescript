import path from "path";
import { PATHS } from "./index.js";

export interface SocketFilePaths {
	INDEX:string;
	IMPORTS:string;
    HANDLER: string;
	INDEX_TEMPLATE:string;
	INDEX_LOC: (destination: string) => string;
	INDEX_TEMPLATE_LOC: (socketLib: string) => string;
  };

  export const SOCKETS = Object.freeze({
	INDEX: "index.ts",
	IMPORTS: "imports.ts",
    HANDLER: "handler.ts",
	INDEX_TEMPLATE: "index.ast.ts",
	INDEX_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.SOCKETS, SOCKETS.INDEX),
	INDEX_TEMPLATE_LOC: (socketLib: string): string => `${PATHS.DIRECTORIES.SRC.SOCKETS}/${socketLib}/${SOCKETS.INDEX_TEMPLATE}`
  }as const) satisfies SocketFilePaths;