import { ImportsFromConfig } from "../types/config.js";

export const authConfig = {
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
  //   PASSPORT_INSTANCE: {
  //     NAME: "../auth/passport",
  //     DEFAULT: { passport: "passport" },
  //     NAMED: {},
  //   },
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
};
type ImportsType = ImportsFromConfig<typeof authConfig>;
export const IMPORTS: ImportsType = Object.freeze(authConfig);
