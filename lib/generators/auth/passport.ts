import {
  DependencyIR,
  ImportConfig,
  ImportsFromConfig,
  MethodExpressionIR,
} from "../../types/index.js";

const passportImports: ImportsFromConfig<{
  PASSPORT: ImportConfig;
  PASSPORT_JWT: ImportConfig;
}> = {
  PASSPORT: {
    NAME: "passport",
    DEFAULT: {
      MORGAN: "passport",
    },
    NAMED: {},
  },
  PASSPORT_JWT: {
    NAME: "passport-jwt",
    DEFAULT: {},
    NAMED: { STRATEGY: "Strategy", EXTRACT_JWT: "ExtractJwt" },
  },
};
const passportInit: MethodExpressionIR = {
  target: { object: "this", property: "app" },
  method: "use",
  arguments: [
    {
      type: "function_call",
      value: "passport",
      arguments: [{ type: "literal", value: "dev" }],
    },
  ],
};

const passportDeps: DependencyIR = {
  FEATURE: {
    name: "passport",
    version: "^0.6.0",
  },
  BASE_DEV: {
    name: "@types/passport",
    version: "^1.0.12",
  },
};
export const PASSPORT = Object.freeze({
  IMPORTS: passportImports,
  INIT: passportInit,
  DEPS: passportDeps,
});

// passport: Object.freeze({
// 	deps: Object.freeze({
// 	  passport: "^0.6.0",
// 	  "passport-local": "^1.0.0",
// 	  "passport-jwt": "^4.0.1",
// 	  jsonwebtoken: "^9.0.2",
// 	  bcrypt: "^5.1.1",
// 	}),
// 	devDeps: Object.freeze({
// 	  "@types/passport": "^1.0.12",
// 	  "@types/passport-local": "^1.0.35",
// 	  "@types/passport-jwt": "^3.0.9",
// 	  "@types/jsonwebtoken": "^9.0.2",
// 	  "@types/bcrypt": "^5.0.0",
// 	}),
//   }),
