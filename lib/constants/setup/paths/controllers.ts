import path from "path";
import { PATHS } from "./index.js";

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
	EXAMPLE: "exampleController.ts",
	INDEX: "index.ts",
	EXAMPLE_TEMPLATE: "exampleController.ast.ts",
	INDEX_TEMPLATE: "index.ast.ts",
	EXAMPLE_LOC: (destination: string): string => path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.CONTROLLERS, PATHS.DIRECTORIES.CONTROLLERS.example, CONTROLLERS.EXAMPLE),
	INDEX_LOC: (destination: string, base: boolean): string => {
		const controllerPath = base
		? path.join(PATHS.DIRECTORIES.SRC.CONTROLLERS, PATHS.DIRECTORIES.CONTROLLERS.example)
		: PATHS.DIRECTORIES.SRC.CONTROLLERS;
		
		return path.join(
			destination, 
			PATHS.DIRECTORIES.ROOT.SRC, 
			controllerPath, 
			CONTROLLERS.INDEX
		);
	},
	EXAMPLE_TEMPLATE_LOC: (): string => `${PATHS.DIRECTORIES.SRC.CONTROLLERS}/${PATHS.DIRECTORIES.CONTROLLERS.example}/${CONTROLLERS.EXAMPLE_TEMPLATE}`,
	INDEX_TEMPLATE_LOC: (base: boolean): string => {
		const basePath = PATHS.DIRECTORIES.SRC.CONTROLLERS;
		return base 
			? `${basePath}/${PATHS.DIRECTORIES.CONTROLLERS.example}/${CONTROLLERS.INDEX_TEMPLATE}`
			: `${basePath}/${CONTROLLERS.INDEX_TEMPLATE}`;
	},
  }as const) satisfies ControllersFilePaths;