import path from "path";
import { PATHS } from "./index.js";
import { EXTENSIONS } from "./extensions.js";

export interface ControllersFilePaths {
	EXAMPLE: string;
	INDEX: string;
	EXAMPLE_TEMPLATE: string;
	INDEX_TEMPLATE: string;
	EXAMPLE_LOC: (destination: string) => string;
	INDEX_LOC: (destination: string, base: boolean) => string;
	EXAMPLE_TEMPLATE_LOC: () => string;
	INDEX_TEMPLATE_LOC: (base: boolean) => string;
  };

  export const CONTROLLERS = Object.freeze({
	EXAMPLE: "exampleController",
	INDEX: "index",
	EXAMPLE_TEMPLATE: "exampleController",
	INDEX_TEMPLATE: "index",
	EXAMPLE_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.CONTROLLERS, PATHS.DIRECTORIES.CONTROLLERS.example, CONTROLLERS.EXAMPLE + EXTENSIONS.TS),
	INDEX_LOC: (destination: string, base: boolean): string => {
		const controllerPath = base
		? path.join(PATHS.DIRECTORIES.SRC.CONTROLLERS, PATHS.DIRECTORIES.CONTROLLERS.example)
		: PATHS.DIRECTORIES.SRC.CONTROLLERS;
		
		return path.join(
			destination, 
			PATHS.DIRECTORIES.ROOT.SRC, 
			controllerPath, 
			CONTROLLERS.INDEX + EXTENSIONS.TS
		);
	},
	EXAMPLE_TEMPLATE_LOC: (): string => path.join(PATHS.DIRECTORIES.SRC.CONTROLLERS, PATHS.DIRECTORIES.CONTROLLERS.example, CONTROLLERS.EXAMPLE_TEMPLATE + EXTENSIONS.AST),
		// `${PATHS.DIRECTORIES.SRC.CONTROLLERS}/${PATHS.DIRECTORIES.CONTROLLERS.example}/${CONTROLLERS.EXAMPLE_TEMPLATE}`,
	INDEX_TEMPLATE_LOC: (base: boolean): string => {
		const basePath = PATHS.DIRECTORIES.SRC.CONTROLLERS;
		return base 
			? path.join(basePath, PATHS.DIRECTORIES.CONTROLLERS.example, CONTROLLERS.INDEX_TEMPLATE + EXTENSIONS.AST)
			// `${basePath}/${PATHS.DIRECTORIES.CONTROLLERS.example}/${CONTROLLERS.INDEX_TEMPLATE}`
			: path.join(basePath, CONTROLLERS.INDEX_TEMPLATE + EXTENSIONS.AST)
			// `${basePath}/${CONTROLLERS.INDEX_TEMPLATE}`;
	},
  }as const) satisfies ControllersFilePaths;