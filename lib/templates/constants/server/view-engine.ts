/**
 * Server view engine setup constants
 * Contains setup code for different view engines
 */

import { ServerViewEngineSetup } from "../../types/server/index.js";

export const VIEW_ENGINE_SETUP = Object.freeze({
  PUG: `
    // Set up view engine
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');`,
  EJS: `
    // Set up view engine
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');`,
  HANDLEBARS: `
    // Set up view engine
    this.app.engine('handlebars', exphbs({
      layoutsDir: path.join(__dirname, 'views/layouts'),
      defaultLayout: 'main',
      extname: '.handlebars'
    }));
    this.app.set('view engine', 'handlebars');
    this.app.set('views', path.join(__dirname, 'views'));`,
} as const) satisfies ServerViewEngineSetup;
