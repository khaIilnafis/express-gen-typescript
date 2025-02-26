/**
 * Template views constants
 * Contains constants for view template file paths organized by view engine
 */

/**
 * Type definition for view layouts
 */
export interface ViewLayouts {
  MAIN: string;
}

/**
 * Type definition for view partials
 */
export interface ViewPartials {
  FOOTER: string;
  HEADER: string;
//   NAVIGATION: string;
//   HEAD: string;
//   SCRIPTS: string;
}

/**
 * Type definition for view pages
 */
export interface ViewPages {
  INDEX: string;
  ABOUT: string;
  ERROR: string;
}

/**
 * Type definition for view engine templates
 */
export interface ViewEngineTemplates {
  LAYOUTS: ViewLayouts;
  PARTIALS: ViewPartials;
//   PAGES: ViewPages;
  INDEX: string;
}

/**
 * Type definition for template views
 */
export interface TemplateViews {
  PUG: ViewEngineTemplates;
  EJS: ViewEngineTemplates;
  HANDLEBARS: ViewEngineTemplates;
}

/**
 * Template views constants
 * Defines file paths for view templates organized by view engine
 */
export const VIEWS = Object.freeze({
  PUG: {
    LAYOUTS: {
      MAIN: "views/pug/layouts/main.pug",
    },
    PARTIALS: {
      FOOTER: "views/pug/partials/footer.pug",
      HEADER: "views/pug/partials/header.pug",
    //   NAVIGATION: "views/pug/partials/navigation.pug",
    //   HEAD: "views/pug/partials/head.pug",
    //   SCRIPTS: "views/pug/partials/scripts.pug",
    },
    // PAGES: {
    //   INDEX: "views/pug/pages/index.pug",
    //   ABOUT: "views/pug/pages/about.pug",
    //   ERROR: "views/pug/pages/error.pug",
    // },
    INDEX: "views/pug/pages/index.pug",
  },
  EJS: {
    LAYOUTS: {
      MAIN: "views/ejs/layouts/main.ejs",
    },
    PARTIALS: {
      FOOTER: "views/ejs/partials/footer.ejs",
      HEADER: "views/ejs/partials/header.ejs",
    //   NAVIGATION: "views/ejs/partials/navigation.ejs",
    //   HEAD: "views/ejs/partials/head.ejs",
    //   SCRIPTS: "views/ejs/partials/scripts.ejs",
    },
    // PAGES: {
    //   INDEX: "views/ejs/pages/index.ejs",
    //   ABOUT: "views/ejs/pages/about.ejs",
    //   ERROR: "views/ejs/pages/error.ejs",
    // },
    INDEX: "views/ejs/pages/index.ejs",
  },
  HANDLEBARS: {
    LAYOUTS: {
      MAIN: "views/handlebars/layouts/main.handlebars",
    },
    PARTIALS: {
      FOOTER: "views/handlebars/partials/footer.handlebars",
      HEADER: "views/handlebars/partials/header.handlebars",
    //   NAVIGATION: "views/handlebars/partials/navigation.handlebars",
    //   HEAD: "views/handlebars/partials/head.handlebars",
    //   SCRIPTS: "views/handlebars/partials/scripts.handlebars",
    },
    // PAGES: {
    //   INDEX: "views/handlebars/pages/index.handlebars",
    //   ABOUT: "views/handlebars/pages/about.handlebars",
    //   ERROR: "views/handlebars/pages/error.handlebars",
    // },
    INDEX: "views/handlebars/pages/index.handlebars",
  },
} as const) satisfies TemplateViews; 