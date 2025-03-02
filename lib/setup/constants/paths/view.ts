import { TemplateViewPaths } from "../../types/paths/index.js";

export const VIEWS = Object.freeze({
  LAYOUTS: {
    MAIN: (engine: string) => `views/${engine}/layouts/main.${engine}`,
  },
  PARTIALS: {
    FOOTER: (engine: string) => `views/${engine}/partials/footer.${engine}`,
    HEADER: (engine: string) => `views/${engine}/partials/header.${engine}`,
  },
  PAGES: {
    INDEX: (engine: string) => `views/${engine}/pages/index.${engine}`,
    ABOUT: (engine: string) => `views/${engine}/pages/about.${engine}`,
    ERROR: (engine: string) => `views/${engine}/pages/error.${engine}`,
  },
  INDEX: (engine: string) => `views/${engine}/pages/index.${engine}`,
} as const) satisfies TemplateViewPaths;
