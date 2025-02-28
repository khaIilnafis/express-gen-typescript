export interface ViewPartials {
	FOOTER: (engine:string)=> string;
	HEADER: (engine:string)=> string;
  }
  /**
 * Type definition for view layouts
 */
export interface ViewLayouts {
	MAIN: (engine:string)=> string;
  }
  /**
 * Type definition for view pages
 */
export interface ViewPages {
	INDEX: (engine:string)=> string;
	ABOUT: (engine:string)=> string;
	ERROR: (engine:string)=> string;
  }
  export interface TemplateViewPaths {
	LAYOUTS: ViewLayouts;
	PARTIALS: ViewPartials;
    PAGES: ViewPages;
	INDEX: (engine:string)=> string;
  };

  export const VIEWS = Object.freeze({
	LAYOUTS: {
		MAIN: (engine: string)=>`views/${engine}/layouts/main.${engine}`,
	  },
	  PARTIALS: {
		FOOTER: (engine: string)=>`views/${engine}/partials/footer.${engine}`,
		HEADER: (engine: string)=>`views/${engine}/partials/header.${engine}`,
	  },
	  PAGES: {
		INDEX: (engine: string)=>`views/${engine}/pages/index.${engine}`,
		ABOUT: (engine: string)=>`views/${engine}/pages/about.${engine}`,
		ERROR: (engine: string)=>`views/${engine}/pages/error.${engine}`,
	  },
	  INDEX: (engine: string)=>`views/${engine}/pages/index.${engine}`,
  }as const) satisfies TemplateViewPaths;