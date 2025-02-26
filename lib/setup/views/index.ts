import * as fs from "fs";
import * as path from "path";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import {
  PROJECT,
  TEMPLATES,
  VIEW_ENGINES,
  SERVER
} from "../../constants/index.js";
import { insertContentAtMarker, addImportIfNotExists } from "../../utils/file-manipulation.js";

// Define view engine configuration markers
const VIEW_ENGINE_CONFIG_MARKER = "// VIEW_ENGINE_CONFIG";

/**
 * Setup view engine based on user selection
 * @param {string} destination - Project destination directory
 * @param {string} viewEngine - Selected view engine
 * @param {Object} options - Additional options
 * @param {string} options.appName - Application name
 */
async function setupViewEngine(
  destination: string,
  viewEngine: string,
  options: { appName?: string } = {}
): Promise<void> {
  // Get app name from options or use default
  const appName =
    options.appName ||
    path
      .basename(destination)
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  // Create necessary directories if they don't exist
  const viewsDir = path.join(
    destination, 
    PROJECT.DIRECTORIES.ROOT.SRC, 
    PROJECT.DIRECTORIES.SRC.VIEWS
  );
  if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true });
  }

  // Create layouts directory
  const layoutsDir = path.join(viewsDir, PROJECT.DIRECTORIES.VIEWS.LAYOUTS);
  if (!fs.existsSync(layoutsDir)) {
    fs.mkdirSync(layoutsDir, { recursive: true });
  }

  // Create partials directory
  const partialsDir = path.join(viewsDir, PROJECT.DIRECTORIES.VIEWS.PARTIALS);
  if (!fs.existsSync(partialsDir)) {
    fs.mkdirSync(partialsDir, { recursive: true });
  }

  // Update server.ts to include view engine configuration
  const serverFilePath = path.join(
    destination, 
    PROJECT.DIRECTORIES.ROOT.SRC, 
    PROJECT.FILES.SERVER.FILE
  );

  if (fs.existsSync(serverFilePath)) {
    // Import statements and config based on view engine
    let importStatement = "";
    let configContent = "";

    switch (viewEngine) {
      case VIEW_ENGINES.TYPES.EJS:
        configContent = SERVER.VIEW_ENGINE_SETUP.EJS;
        break;
      case VIEW_ENGINES.TYPES.PUG:
        configContent = SERVER.VIEW_ENGINE_SETUP.PUG;
        break;
      case VIEW_ENGINES.TYPES.HANDLEBARS:
        importStatement = "import exphbs from 'express-handlebars';";
        configContent = SERVER.VIEW_ENGINE_SETUP.HANDLEBARS;
        break;
    }

    // Add imports if needed
    if (importStatement) {
      addImportIfNotExists(serverFilePath, importStatement);
    }

    // Add configuration to server
    if (configContent) {
      insertContentAtMarker(serverFilePath, VIEW_ENGINE_CONFIG_MARKER, configContent);
    }
  }

  // Create example view files based on the selected engine
  const templateVars = {
    appName,
    currentYear: new Date().getFullYear().toString(),
  };

  // Get file extensions for the selected view engine
  const viewExtension = getViewExtension(viewEngine);
  const layoutFileName = `main${viewExtension}`;
  const indexFileName = `index${viewExtension}`;
  const headerFileName = `header${viewExtension}`;
  const footerFileName = `footer${viewExtension}`;

  switch (viewEngine) {
    case VIEW_ENGINES.TYPES.EJS:
      // Create main layout
      writeTemplate(
        getTemplatePath(TEMPLATES.VIEWS.EJS.LAYOUTS.MAIN),
        path.join(layoutsDir, layoutFileName),
        templateVars
      );
      
    // Create index view
      writeTemplate(
        getTemplatePath(TEMPLATES.VIEWS.EJS.INDEX),
        path.join(viewsDir, indexFileName),
        templateVars
      );

	// Create Header partial
		writeTemplate(getTemplatePath(TEMPLATES.VIEWS.EJS.PARTIALS.HEADER), path.join(partialsDir, headerFileName), templateVars);

	// Create Footer partial
		writeTemplate(getTemplatePath(TEMPLATES.VIEWS.EJS.PARTIALS.FOOTER), path.join(partialsDir, footerFileName), templateVars);
      break;

    case VIEW_ENGINES.TYPES.PUG:
      // Create main layout
      writeTemplate(
        getTemplatePath(TEMPLATES.VIEWS.PUG.LAYOUTS.MAIN),
        path.join(layoutsDir, layoutFileName),
        templateVars
      );
      
      // Create index view
      writeTemplate(
        getTemplatePath(TEMPLATES.VIEWS.PUG.INDEX),
        path.join(viewsDir, indexFileName),
        templateVars
      );

	  // Create Header partial
		writeTemplate(getTemplatePath(TEMPLATES.VIEWS.PUG.PARTIALS.HEADER), path.join(partialsDir, headerFileName), templateVars);

		// Create Footer partial
			writeTemplate(getTemplatePath(TEMPLATES.VIEWS.PUG.PARTIALS.FOOTER), path.join(partialsDir, footerFileName), templateVars);
      break;

    case VIEW_ENGINES.TYPES.HANDLEBARS:
      // Create main layout
      writeTemplate(
        getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.LAYOUTS.MAIN),
        path.join(layoutsDir, layoutFileName),
        templateVars
      );
      
    //   // Create index view
      writeTemplate(
        getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.INDEX),
        path.join(viewsDir, indexFileName),
        templateVars
      );

	  // Create Header partial
		writeTemplate(getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.PARTIALS.HEADER), path.join(partialsDir, headerFileName), templateVars);

		// Create Footer partial
			writeTemplate(getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.PARTIALS.FOOTER), path.join(partialsDir, footerFileName), templateVars);
      break;
  }

  // Create a simple route for the index page
  createViewRoutes(destination);

  console.log(`${viewEngine} view engine setup complete.`);
}

// /**
//  * Create default view routes
//  * @param destination - Project destination directory
//  */
function createViewRoutes(destination: string): void {
  const routesDir = path.join(
    destination, 
    PROJECT.DIRECTORIES.ROOT.SRC, 
    PROJECT.DIRECTORIES.SRC.ROUTES
  );
  
  const indexRoutePath = path.join(routesDir, "index.ts");
    // Create a new index route file with proper view rendering
    const templateVars = {
      rootRouteHandler: SERVER.ROOT_ROUTE_HANDLER.DEFAULT
    };
    
    writeTemplate(
      getTemplatePath(TEMPLATES.ROUTES.INDEX),
      indexRoutePath,
      templateVars
    );
}

/**
 * Get file extension for view engine
 * @param viewEngine - Selected view engine
 * @returns File extension including dot
 */
function getViewExtension(viewEngine: string): string {
  switch (viewEngine) {
    case VIEW_ENGINES.TYPES.PUG:
      return VIEW_ENGINES.EXTENSIONS.PUG;
    case VIEW_ENGINES.TYPES.EJS:
      return VIEW_ENGINES.EXTENSIONS.EJS;
    case VIEW_ENGINES.TYPES.HANDLEBARS:
      return VIEW_ENGINES.EXTENSIONS.HANDLEBARS;
    default:
      return "";
  }
}

export default setupViewEngine;
