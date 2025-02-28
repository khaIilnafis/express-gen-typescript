import * as fs from "fs";
import * as path from "path";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import {
  VIEW_ENGINES,
  SERVER,
  PATHS
} from "../../constants/index.js";
import { addImportIfNotExists } from "../../utils/file-manipulation.js";
import { IMPORTS } from "../../constants/templates/server/imports.js";
import { getASTTemplatePath, writeASTTemplate } from "../../utils/ast-template-processor.js";

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
    PATHS.DIRECTORIES.ROOT.SRC, 
    PATHS.DIRECTORIES.SRC.VIEWS
  );
  if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true });
  }

  // Create layouts directory
  const layoutsDir = path.join(viewsDir, PATHS.DIRECTORIES.VIEWS.LAYOUTS);
  if (!fs.existsSync(layoutsDir)) {
    fs.mkdirSync(layoutsDir, { recursive: true });
  }

  // Create partials directory
  const partialsDir = path.join(viewsDir, PATHS.DIRECTORIES.VIEWS.PARTIALS);
  if (!fs.existsSync(partialsDir)) {
    fs.mkdirSync(partialsDir, { recursive: true });
  }

  // Update server.ts to include view engine configuration
  const serverFilePath = path.join(
    destination, 
    PATHS.DIRECTORIES.ROOT.SRC, 
    PATHS.FILES.SERVER.FILE
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
        importStatement = IMPORTS.VIEW_ENGINE.HANDLEBARS;
        configContent = SERVER.VIEW_ENGINE_SETUP.HANDLEBARS;
        break;
    }

    // Add imports if needed
    if (importStatement) {
      addImportIfNotExists(serverFilePath, importStatement);
    }
	// WHy am i doing this here.
    // Add configuration to server
    if (configContent) {
		const tempFilePath = path.join(path.dirname(serverFilePath), 'db-connect-temp.ts');
		await writeASTTemplate(
			getASTTemplatePath(PATHS.FILES.MODELS.INIT_TEMPLATE_LOC('sequelize')),
			tempFilePath,
			{}
		  );
		fs.unlinkSync(tempFilePath)
		//const generatedContent = fs.readFileSync(tempFilePath, 'utf8');
    	//insertContentAtMarker(serverFilePath, PROJECT.FILES.COMMON.MARKERS.VIEW_ENGINE_CONFIG_MARKER, generatedContent);
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
		let engine = VIEW_ENGINES.TYPES.EJS.toString();

      	// Create main layout
      	writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.LAYOUTS.MAIN(engine)),path.join(layoutsDir, layoutFileName),templateVars);
      
    	// Create index view
      	writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.INDEX(engine)),path.join(viewsDir, indexFileName),templateVars);

		// Create Header partial
		writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.PARTIALS.HEADER(engine)), path.join(partialsDir, headerFileName), templateVars);

		// Create Footer partial
		writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.PARTIALS.FOOTER(engine)), path.join(partialsDir, footerFileName), templateVars);
      break;

    case VIEW_ENGINES.TYPES.PUG:
		engine = VIEW_ENGINES.TYPES.PUG.toString();

      	// Create main layout
      	writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.LAYOUTS.MAIN(engine)),path.join(layoutsDir, layoutFileName),templateVars);
      
      	// Create index view
      	writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.INDEX(engine)),path.join(viewsDir, indexFileName),templateVars);

	  	// Create Header partial
		writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.PARTIALS.HEADER(engine)), path.join(partialsDir, headerFileName), templateVars);

		// Create Footer partial
		writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.PARTIALS.FOOTER(engine)), path.join(partialsDir, footerFileName), templateVars);
      break;

    case VIEW_ENGINES.TYPES.HANDLEBARS:
		engine = VIEW_ENGINES.TYPES.HANDLEBARS.toString();
      // Create main layout
      writeTemplate(
        getTemplatePath(PATHS.FILES.VIEWS.LAYOUTS.MAIN(engine)),
        path.join(layoutsDir, layoutFileName),
        templateVars
      );
 	 	// Create index view
      	writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.INDEX(engine)),path.join(viewsDir, indexFileName),templateVars);

	  	// Create Header partial
		writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.PARTIALS.HEADER(engine)), path.join(partialsDir, headerFileName), templateVars);

		// Create Footer partial
		writeTemplate(getTemplatePath(PATHS.FILES.VIEWS.PARTIALS.FOOTER(engine)), path.join(partialsDir, footerFileName), templateVars);
      break;
  }

  console.log(`${viewEngine} view engine setup complete.`);
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
