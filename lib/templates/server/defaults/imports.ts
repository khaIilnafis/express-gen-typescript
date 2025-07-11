import { ImportConfig, ImportsFromConfig } from "../../../types/index.js";

const IMPORTS: ImportsFromConfig<{
  ENV: ImportConfig;
  PATH: ImportConfig;
  HTTP: ImportConfig;
  ROUTES: ImportConfig;
  DATABASE: ImportConfig;
}> = {
  ENV: {
    NAME: "dotenv/config",
    DEFAULT: {
      EXPRESS: "dotenv",
    },
    NAMED: {},
  },
  PATH: {
    NAME: "path",
    DEFAULT: {
      PATH: "path",
    },
    NAMED: {},
  },
  HTTP: {
    NAME: "http",
    DEFAULT: {
      HTTP: "http",
    },
    NAMED: {},
  },
  ROUTES: {
    NAME: "./routes",
    DEFAULT: {},
    NAMED: {
      INIT: "initializeRoutes",
    },
  },
  DATABASE: {
    NAME: "./database",
    DEFAULT: {},
    NAMED: {
      DATBASE: "initializeDatabase",
    },
  },
};

export default IMPORTS;
