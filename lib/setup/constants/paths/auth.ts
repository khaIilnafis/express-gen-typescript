import path from "path";
import { PATHS } from "./index.js";
import { AuthFilePaths } from "../../types/paths/index.js";

export const AUTH = Object.freeze({
  CONFIG: (destination: string, authLib: string): string =>
    path.join(
      destination,
      PATHS.DIRECTORIES.ROOT.SRC,
      PATHS.DIRECTORIES.SRC.AUTH,
      `${authLib}.ts`,
    ),
  CONFIG_TEMPLATE: (authLib: string) => `auth/${authLib}/${authLib}.ast.ts`,
  MIDDLEWARE: {
    AUTH: "middleware/auth.ts",
    AUTH_TEMPLATE: "middleware/auth.ast.ts",
  },
} as const) satisfies AuthFilePaths;
