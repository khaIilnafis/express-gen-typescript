import { ExportConfig } from "../types/index.js";

export const authConfig = {
  imports: {
    ALL: {
      PASSPORT: {
        NAME: "passport",
        DEFAULT: { passport: "passport" },
        NAMED: {},
      },
      PASSPORT_JWT: {
        NAME: "passport-jwt",
        DEFAULT: {},
        NAMED: { STRATEGY: "Strategy", EXTRACT_JWT: "ExtractJwt" },
      },
      EXPRESS: {
        NAME: "express",
        DEFAULT: {},
        NAMED: {
          REQUEST: "Request",
          RESPONSE: "Response",
          NEXT: "NextFunction",
        },
      },
      MODEL: {
        NAME: "../models/example",
        DEFAULT: {
          EXAMPLE: "Example",
        },
        NAMED: {},
      },
      JWT: {
        NAME: "jsonwebtoken",
        DEFAULT: {
          JWT: "jwt",
        },
        NAMED: {},
      },
    },
  },
  exports: {
    NAMED: {},
    DEFAULT: {
      PASSPORT: "passport",
    },
  } as ExportConfig,
};
//   PASSPORT_INSTANCE: {
//     NAME: "../auth/passport",
//     DEFAULT: { passport: "passport" },
//     NAMED: {},
//   },
// type ImportsType = ImportsFromConfig<typeof authConfig>;
// export const IMPORTS: ImportsType = Object.freeze(authConfig);
