import { ImportConfig } from "../../types/index.js";

const ejsImports: ImportConfig = {
  NAME: "ejs",
  DEFAULT: {
    EJS: "ejs",
  },
  NAMED: {},
};

export const EJS = Object.freeze({
  IMPORTS: ejsImports,
});

// ejs: Object.freeze({
//   deps: Object.freeze({
//     ejs: "^3.1.9",
//   }),
//   devDeps: Object.freeze({
//     "@types/ejs": "^3.1.2",
//   }),
// }),
