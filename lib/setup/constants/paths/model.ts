import path from "path";
import { PATHS } from "./index.js";
import { ModelFilePaths } from "../../types/paths/index.js";

export const MODELS = Object.freeze({
  //handle typeorm needing .entity.
  EXAMPLE: "Example.ts",
  ENTITY_EXAMPLE: "Example.entity.ts",
  INDEX: "index.ts",
  EXAMPLE_TEMPLATE: "Example.ast.ts",
  INDEX_TEMPLATE: "index.ast.ts",
  EXAMPLE_LOC: (destination: string, entity?: boolean): string => {
    const destPath = entity
      ? path.join(
          destination,
          PATHS.DIRECTORIES.ROOT.SRC,
          PATHS.DIRECTORIES.SRC.MODELS,
          MODELS.ENTITY_EXAMPLE,
        )
      : path.join(
          destination,
          PATHS.DIRECTORIES.ROOT.SRC,
          PATHS.DIRECTORIES.SRC.MODELS,
          MODELS.EXAMPLE,
        );
    return destPath;
  },
  INDEX_LOC: (destination: string): string =>
    path.join(
      destination,
      PATHS.DIRECTORIES.ROOT.SRC,
      PATHS.DIRECTORIES.SRC.MODELS,
      MODELS.INDEX,
    ),
  INIT_LOC: (destination: string, orm: string): string =>
    path.join(
      destination,
      PATHS.DIRECTORIES.ROOT.SRC,
      PATHS.DIRECTORIES.SRC.DATABASE,
      `${orm}-method.ts`,
    ),
  INIT_TEMPLATE_LOC: (orm: string): string =>
    `${PATHS.DIRECTORIES.SRC.DATABASE}/${orm}/${orm}-method.ast.ts`,
  EXAMPLE_TEMPLATE_LOC: (orm: string): string =>
    `${PATHS.DIRECTORIES.SRC.MODELS}/${orm}/${MODELS.EXAMPLE_TEMPLATE}`,
  INDEX_TEMPLATE_LOC: (orm: string): string =>
    `${PATHS.DIRECTORIES.SRC.MODELS}/${orm}/${MODELS.INDEX_TEMPLATE}`,
} as const) satisfies ModelFilePaths;
