import dotenv from "dotenv";
dotenv.config({ path: `.env` });
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
// import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import http from 'http';

{{databaseImports}}
{{authImports}}
{{websocketImports}}
{{viewImports}}

// Import routes
import { initializeRoutes } from './routes';

export class Server {
  public app: Application;
  public server: http.Server;
  private port: number | string;
  {{classProperties}}

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = process.env.PORT || 3000;
    
    this.initializeMiddlewares();
    {{constructorCalls}}
    this.initializeRoutes();
    // this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());
    
    // Enable CORS
    this.app.use(cors());
    
    // Request logging
    this.app.use(morgan('dev'));
    
    // Body parsing middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Compression middleware
    // this.app.use(compression());
    
    // Serve static files
    this.app.use(express.static(path.join(__dirname, 'public')));
    
    {{middlewareSetup}}
  }

  // Database connection methods
  {{databaseMethod}}

  {{websocketMethod}}

  private initializeRoutes(): void {
    // Initialize routes and pass socket server if available
    {{socketRouterInit}}
    
    this.app.use('/api', router);
    this.app.use("/api/*", (req, res) => {
		res.status(404).json({ error: "Not Found" });
	  });
  }

//   private initializeErrorHandling(): void {
//     // 404 handler
//     this.app.use((req: Request, res: Response) => {
//       res.status(404).json({ message: 'Not Found' });
//     });
    
//     // Global error handler
//     this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     });
//   }
	public listen(port: number): void {
		this.server.listen(port, () => {
		console.log(`Server running on port ${port}`);
		});
	}
}