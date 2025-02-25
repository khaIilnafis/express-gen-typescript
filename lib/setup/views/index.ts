import * as fs from "fs";
import * as path from "path";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";

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
  console.log(`Setting up ${viewEngine} view engine...`);

  // Get app name from options or use default
  const appName =
    options.appName ||
    path
      .basename(destination)
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  // Create necessary directories if they don't exist
  const viewsDir = path.join(destination, "src", "views");
  if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true });
  }

  // Update server.ts to include view engine configuration
  const serverFilePath = path.join(destination, "src", "server.ts");

  if (fs.existsSync(serverFilePath)) {
    let serverFileContent = fs.readFileSync(serverFilePath, "utf8");

    // Import statements based on view engine
    let importStatement = "";
    let configStatement = "";

    switch (viewEngine) {
      case "EJS":
        importStatement = "// View engine\nimport ejs from 'ejs';";
        configStatement = `
    // View engine setup
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));`;
        break;
      case "Pug (Jade)":
        configStatement = `
    // View engine setup
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname, 'views'));`;
        break;
      case "Handlebars":
        importStatement =
          "// View engine\nimport { engine } from 'express-handlebars';";
        configStatement = `
    // View engine setup
    this.app.engine('handlebars', engine());
    this.app.set('view engine', 'handlebars');
    this.app.set('views', path.join(__dirname, 'views'));`;
        break;
    }

    // Add import statement if needed
    if (importStatement) {
      const lastImportIndex = serverFileContent.lastIndexOf("import");
      const lastImportLineEnd = serverFileContent.indexOf(
        "\n",
        lastImportIndex
      );
      serverFileContent =
        serverFileContent.substring(0, lastImportLineEnd + 1) +
        importStatement +
        "\n" +
        serverFileContent.substring(lastImportLineEnd + 1);
    }

    // Add configuration to constructor
    const constructorIndex = serverFileContent.indexOf("constructor(");
    if (constructorIndex !== -1) {
      const constructorBodyIndex = serverFileContent.indexOf(
        "{",
        constructorIndex
      );
      const staticDirIndex = serverFileContent.indexOf(
        "this.app.use(express.static",
        constructorBodyIndex
      );
      if (staticDirIndex !== -1) {
        const staticDirLineEnd = serverFileContent.indexOf(
          "\n",
          staticDirIndex
        );
        serverFileContent =
          serverFileContent.substring(0, staticDirLineEnd + 1) +
          configStatement +
          "\n" +
          serverFileContent.substring(staticDirLineEnd + 1);
      }
    }

    fs.writeFileSync(serverFilePath, serverFileContent);
    // console.log("Updated server.ts with view engine configuration");
  }

  // Create example view files based on the selected engine
  const templateVars = {
    appName,
    currentYear: new Date().getFullYear().toString(),
  };

  switch (viewEngine) {
    case "EJS":
      // Create index.ejs
      writeTemplate(
        getTemplatePath("views/ejs/index.ejs"),
        path.join(viewsDir, "index.ejs"),
        templateVars
      );
      break;

    case "Pug (Jade)":
      // Create layout.pug and index.pug
      writeTemplate(
        getTemplatePath("views/pug/layout.pug"),
        path.join(viewsDir, "layout.pug"),
        templateVars
      );
      writeTemplate(
        getTemplatePath("views/pug/index.pug"),
        path.join(viewsDir, "index.pug"),
        templateVars
      );
      break;

    case "Handlebars":
      // Create layouts directory
      const layoutsDir = path.join(viewsDir, "layouts");
      if (!fs.existsSync(layoutsDir)) {
        fs.mkdirSync(layoutsDir, { recursive: true });
      }

      // Create main.handlebars and index.handlebars
      writeTemplate(
        getTemplatePath("views/handlebars/layouts/main.handlebars"),
        path.join(layoutsDir, "main.handlebars"),
        templateVars
      );
      writeTemplate(
        getTemplatePath("views/handlebars/index.handlebars"),
        path.join(viewsDir, "index.handlebars"),
        templateVars
      );
      break;
  }

  // Create a simple route for the index page
  const routesDir = path.join(destination, "src", "routes");
  const indexRoutePath = path.join(routesDir, "index.ts");

  if (!fs.existsSync(indexRoutePath)) {
    const indexRouteContent = `import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /
 * Home page
 */
router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

export default router;
`;

    fs.writeFileSync(indexRoutePath, indexRouteContent);
    // Update routes/index.ts to include the new route
    const routesIndexPath = path.join(routesDir, "index.ts");
    if (fs.existsSync(routesIndexPath)) {
      let routesIndexContent = fs.readFileSync(routesIndexPath, "utf8");

      // Check if we need to add the import
      if (!routesIndexContent.includes("import indexRouter")) {
        const lastImportIndex = routesIndexContent.lastIndexOf("import");
        const lastImportLineEnd = routesIndexContent.indexOf(
          "\n",
          lastImportIndex
        );
        routesIndexContent =
          routesIndexContent.substring(0, lastImportLineEnd + 1) +
          "import indexRouter from './index';\n" +
          routesIndexContent.substring(lastImportLineEnd + 1);
      }

      // Check if we need to add the route
      if (!routesIndexContent.includes("router.use('/'")) {
        const exportIndex = routesIndexContent.lastIndexOf("export default");
        routesIndexContent =
          routesIndexContent.substring(0, exportIndex) +
          "router.use('/', indexRouter);\n\n" +
          routesIndexContent.substring(exportIndex);
      }

      fs.writeFileSync(routesIndexPath, routesIndexContent);
    }
  }

  console.log(`${viewEngine} view engine setup complete.`);
}

export default setupViewEngine;
