/**
 * Server view engine setup constants
 * Contains setup code for different view engines
 */

/**
 * Type definition for server view engine setup
 */
export interface ServerViewEngineSetup {
  PUG: string;
  EJS: string;
  HANDLEBARS: string;
  PLACEHOLDER: string;
}

/**
 * View engine middleware setup (fallbacks when templates don't exist)
 */
export const VIEW_ENGINE_SETUP = Object.freeze({
  PUG: `
    // Set up view engine
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');`,
  EJS: `
    // Set up view engine
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
    this.app.use(expressLayouts);`,
  HANDLEBARS: `
    // Set up view engine
    this.app.engine('handlebars', exphbs({
      layoutsDir: path.join(__dirname, 'views/layouts'),
      defaultLayout: 'main',
      extname: '.handlebars'
    }));
    this.app.set('view engine', 'handlebars');
    this.app.set('views', path.join(__dirname, 'views'));`,
  PLACEHOLDER: '// VIEW_ENGINE_CONFIG'
} as const) satisfies ServerViewEngineSetup; 