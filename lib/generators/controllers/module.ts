import {
  ImportConfig,
  ImportsFromConfig,
  ExportConfig,
} from "../../types/index.js";

const IMPORTS: ImportsFromConfig<{
  CONTROLLER: ImportConfig;
}> = {
  CONTROLLER: {
    NAME: "./example",
    DEFAULT: {},
    NAMED: {
      EXAMPLE: "ExampleController",
    },
  },
};
const EXPORTS: ExportConfig = {
  DEFAULT: {},
  NAMED: {
    EXAMPLE: "ExampleController",
  },
};
export const MODULE = Object.freeze({
  IMPORTS,
  EXPORTS,
});
