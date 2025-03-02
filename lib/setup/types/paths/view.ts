export interface ViewPartials {
  FOOTER: (engine: string) => string;
  HEADER: (engine: string) => string;
}
/**
 * Type definition for view layouts
 */
export interface ViewLayouts {
  MAIN: (engine: string) => string;
}
/**
 * Type definition for view pages
 */
export interface ViewPages {
  INDEX: (engine: string) => string;
  ABOUT: (engine: string) => string;
  ERROR: (engine: string) => string;
}
export interface TemplateViewPaths {
  LAYOUTS: ViewLayouts;
  PARTIALS: ViewPartials;
  PAGES: ViewPages;
  INDEX: (engine: string) => string;
}
