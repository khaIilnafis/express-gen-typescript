import path from "path";
import { PATHS } from "./index.js";

export interface RouteFilePaths {
	EXAMPLE: string;
	INDEX: string;
	EXAMPLE_TEMPLATE: string;
	INDEX_TEMPLATE: string;
	EXAMPLE_LOC: (destination: string)=> string;
	INDEX_LOC: (destination: string)=> string;
	EXAMPLE_TEMPLATE_LOC: ()=> string;
	INDEX_TEMPLATE_LOC: ()=> string;
  };

  export const ROUTES = Object.freeze({
	EXAMPLE: "example.ts",
	INDEX: "index.ts",
	EXAMPLE_TEMPLATE: "example.ast.ts",
	INDEX_TEMPLATE: "index.ast.ts",
	EXAMPLE_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.ROUTES, ROUTES.EXAMPLE),
	INDEX_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.ROUTES, ROUTES.INDEX),
	EXAMPLE_TEMPLATE_LOC: (): string => `${PATHS.DIRECTORIES.SRC.ROUTES}/${ROUTES.EXAMPLE_TEMPLATE}`,
	INDEX_TEMPLATE_LOC: (): string => `${PATHS.DIRECTORIES.SRC.ROUTES}/${ROUTES.INDEX_TEMPLATE}`,
  }as const) satisfies RouteFilePaths;