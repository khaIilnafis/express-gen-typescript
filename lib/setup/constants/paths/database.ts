import path from "path";
import { PATHS } from "./index.js";
import { EXTENSIONS } from "./extensions.js";
import { DatabaseFilePaths } from "../../types/paths/index.js";

export const DATABASE = Object.freeze({
  CONNECTION: "index",
  CONNECTION_LOC: (destination: string): string =>
    path.join(
      destination,
      PATHS.DIRECTORIES.ROOT.SRC,
      PATHS.DIRECTORIES.SRC.DATABASE,
      DATABASE.CONNECTION + EXTENSIONS.TS,
    ),
  CONNECTION_TEMPLATE_LOC: (db: string): string =>
    path.join(
      PATHS.DIRECTORIES.SRC.DATABASE,
      db,
      DATABASE.CONNECTION + EXTENSIONS.AST,
    ),
} as const) satisfies DatabaseFilePaths;
