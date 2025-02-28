import path from "path";
import { PATHS } from "./index.js";

export interface AuthFilePaths {
	CONFIG: (authLib: string, destination:string) => string;
	CONFIG_TEMPLATE: (authLib: string) => string;
	MIDDLEWARE: {
		AUTH: string;
		AUTH_TEMPLATE: string;
	};
};

export const AUTH = Object.freeze({
	CONFIG: (authLib: string, destination: string): string => path.join(destination, PATHS.DIRECTORIES.SRC.AUTH, `${authLib}`, `${authLib}.ts`),
	CONFIG_TEMPLATE: (authLib: string) => `auth/${authLib}/${authLib}.ast.ts`,
	MIDDLEWARE: {
		AUTH: "middleware/auth.ts",
		AUTH_TEMPLATE: "middleware/auth.ast.ts",
	}
  }as const) satisfies AuthFilePaths;