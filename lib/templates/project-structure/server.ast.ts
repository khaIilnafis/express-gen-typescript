/**
 * AST Template for server.ts
 * This file is processed by the AST template processor and generates the main server file
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';
import { COMMENTS, TEMPLATES } from '../../constants/templates/index.js';
import { GeneratorOptions } from '../../utils/types.js';
import path from 'path';
import { PATHS } from '../../constants/index.js';
import { EXTENSIONS } from '../../constants/setup/paths/extensions.js';
import { IMPORTS } from '../../constants/templates/server/imports.js';
const b = recast.types.builders;

/**
 * Function to conditionally add imports based on options
 * @returns Array of import declarations
 */
function getImports(options: GeneratorOptions) {
  const imports = [
    // Base imports that are always included
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("dotenv"))],
      b.stringLiteral("dotenv")
    ),
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.identifier("dotenv"), b.identifier("config")),
        [
          b.objectExpression([
            b.objectProperty(
              b.identifier("path"),
              b.stringLiteral(".env")
            )
          ])
        ]
      )
    ),
    b.importDeclaration(
      [
        b.importDefaultSpecifier(b.identifier("express")),
        b.importSpecifier(b.identifier("Application")),
        b.importSpecifier(b.identifier("Request")),
        b.importSpecifier(b.identifier("Response")),
        b.importSpecifier(b.identifier("NextFunction"))
      ],
      b.stringLiteral("express")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("helmet"))],
      b.stringLiteral("helmet")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("cors"))],
      b.stringLiteral("cors")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("morgan"))],
      b.stringLiteral("morgan")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("path"))],
      b.stringLiteral("path")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("http"))],
      b.stringLiteral("http")
    ),
  ];

  // Database imports
  if (options.database) {
    if (options.databaseOrm === "mongoose") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("mongoose"))],
          b.stringLiteral("mongoose")
        )
      );
    } else if (options.databaseOrm === "typeorm") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("typeorm"))],
          b.stringLiteral("typeorm")
        )
      );
    } else if (options.databaseOrm === "sequelize") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("sequelize")),],
          b.stringLiteral("sequelize")
        )
      );
	  imports.push(
		b.importDeclaration(
			[b.importSpecifier(b.identifier(IMPORTS.DATABASE.INITIALIZE)),],
			b.stringLiteral(EXTENSIONS.REL_PATH + PATHS.DIRECTORIES.SRC.DATABASE)
		)
	  )
    } else if (options.databaseOrm === "sequelize-typescript") {
      imports.push(
        b.importDeclaration(
          [b.importSpecifier(b.identifier("Sequelize")),],
          b.stringLiteral("sequelize-typescript")
        )
      );
    } else if (options.databaseOrm === "prisma") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("prisma"))],
          b.stringLiteral("@prisma/client")
        )
      );
    }
  } else {
    // Add placeholder comment for database imports
    imports.push(b.expressionStatement(b.identifier(TEMPLATES.STRINGS.MARKERS.DATABASE_IMPORT)));
  }

  // Authentication imports
  if (options.authentication) {
    imports.push(
      b.importDeclaration(
        [b.importDefaultSpecifier(b.identifier("passport"))],
        b.stringLiteral("passport")
      )
    );
  } else {
    // Add placeholder comment for auth imports
    imports.push(b.expressionStatement(b.identifier(TEMPLATES.STRINGS.MARKERS.AUTH_IMPORT)));
  }

  // WebSocket imports
  if (options.websocketLib !== "none") {
    if (options.websocketLib === "socketio") {
      imports.push(
        b.importDeclaration(
          [b.importSpecifier(b.identifier("Server as SocketIOServer")),b.importSpecifier(b.identifier("Socket"))],
          b.stringLiteral("socket.io")
        )
      );
    } else if (options.websocketLib === "ws") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("WebSocket"))],
          b.stringLiteral("ws")
        )
      );
    }
  } else {
    // Add placeholder comment for websocket imports
    imports.push(b.expressionStatement(b.identifier(TEMPLATES.STRINGS.MARKERS.WEBSOCKET_IMPORT)));
  }

  // View engine imports
  if (options.viewEngine !== "none") {
    // Add specific view engine imports
    if (options.viewEngine === "ejs") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("ejs"))],
          b.stringLiteral("ejs")
        )
      );
    } else if (options.viewEngine === "pug") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("pug"))],
          b.stringLiteral("pug")
        )
      );
    } else if (options.viewEngine === "handlebars") {
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier("exphbs"))],
          b.stringLiteral("express-handlebars")
        )
      );
    }
  } else {
    // Add placeholder comment for view imports
    imports.push(b.expressionStatement(b.identifier("/* PLACEHOLDER: viewImports */")));
  }

  // Routes import
  imports.push(
    b.importDeclaration(
      [b.importSpecifier(b.identifier("initializeRoutes"))],
      b.stringLiteral("./routes")
    )
  );

  return imports;
}

/**
 * Function to get class properties based on options
 */
function getClassProperties(options: GeneratorOptions) {
  const properties: any[] = [];
  const appProp = b.classProperty(
	b.identifier("app"),
	null,
	b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Application")))
  );
  appProp.access = "public";
properties.push(appProp);
  const serverProp = b.classProperty(
	b.identifier("server"),
	null,
	b.tsTypeAnnotation(b.tsTypeReference(b.identifier("http.Server")))
  );
  serverProp.access = "public";
properties.push(serverProp);
  const portProp = b.classProperty(
	b.identifier("port"),
	null,
	b.tsTypeAnnotation(
		b.tsUnionType([b.tsNumberKeyword(),b.tsStringKeyword()])
		
	)
  );
  portProp.access = "public";
  properties.push(portProp);
  // Add WebSocket server property if using socket.io
  if (options.websocketLib === "socketio") {
    const ioProperty = b.classProperty(
      b.identifier("io!"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("SocketIOServer")))
    );
	ioProperty.access = "public";
    properties.push(ioProperty);
  } else if (options.websocketLib === "ws") {
    const wssProperty = b.classProperty(
      b.identifier("wss"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(
        b.identifier("WebSocket.Server")
      ))
    );
	wssProperty.access = "public";
    properties.push(wssProperty);
  }

  // Add database client if using Prisma
  if (options.databaseOrm === "prisma") {
    const prismaProperty = b.classProperty(
      b.identifier("prisma"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(
        b.identifier("PrismaClient")
      ))
    );
	prismaProperty.access = "public";
    properties.push(prismaProperty);
  }

  return properties;
}

/**
 * Function to generate constructor method with appropriate calls
 * @returns Method definition for constructor
 */
function getConstructorMethod(options: GeneratorOptions) {
  const constructorStatements = [
    // Default constructor statements
    b.expressionStatement(
      b.assignmentExpression(
        "=",
        b.memberExpression(b.thisExpression(), b.identifier("app")),
        b.callExpression(b.identifier("express"), [])
      )
    ),
    b.expressionStatement(
      b.assignmentExpression(
        "=",
        b.memberExpression(b.thisExpression(), b.identifier("server")),
        b.callExpression(
          b.memberExpression(b.identifier("http"), b.identifier("createServer")),
          [b.memberExpression(b.thisExpression(), b.identifier("app"))]
        )
      )
    ),
    b.expressionStatement(
      b.assignmentExpression(
        "=",
        b.memberExpression(b.thisExpression(), b.identifier("port")),
        b.logicalExpression(
          "||",
          b.memberExpression(
            b.memberExpression(b.identifier("process"), b.identifier("env")),
            b.identifier("PORT")
          ),
          b.numericLiteral(3000)
        )
      )
    ),
    // Initialize middlewares
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.thisExpression(), b.identifier("initializeMiddlewares")),
        []
      )
    )
  ];

  // Add database initialization if needed
  if (options.database) {
    constructorStatements.push(
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(b.identifier("Server"), b.identifier("connectToDatabase")),
          []
        )
      )
    );
  }

  // Add WebSocket initialization if needed
  if (options.websocketLib !== "none") {
    constructorStatements.push(
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(b.thisExpression(), b.identifier("initializeWebSockets")),
          []
        )
      )
    );
  }

  // Initialize routes
  constructorStatements.push(
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.thisExpression(), b.identifier("initializeRoutes")),
        []
      )
    )
  );

  // Initialize error handling
  constructorStatements.push(
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.thisExpression(), b.identifier("initializeErrorHandling")),
        []
      )
    )
  );

  return b.methodDefinition(
    "constructor",
    b.identifier("constructor"),
    b.functionExpression(
      null,
      [],
      b.blockStatement(constructorStatements)
    )
  );
}

/**
 * Function to get database connection method
 * @returns Method definition for database connection or null if no database selected
 */
function getDatabaseMethod(options: GeneratorOptions) {
	if (!options.database) {
    	return null;
  	}

  let methodBody: recast.types.namedTypes.BlockStatement;
  
  if(options.databaseOrm === "sequelize"){
	methodBody = b.blockStatement([
		// try {
		b.tryStatement(
		  b.blockStatement([
			// await initializeDatabase();
			b.expressionStatement(
			  b.awaitExpression(
				b.callExpression(
				  b.identifier(IMPORTS.DATABASE.INITIALIZE),
				  []
				)
			  )
			),
			// console.log('Database connection established successfully.');
			b.expressionStatement(
			  b.callExpression(
				b.memberExpression(
				  b.identifier("console"),
				  b.identifier("log")
				),
				[b.stringLiteral("Database connection established successfully.")]
			  )
			)
		  ]),
		  // catch (error) {
		  b.catchClause(
			b.identifier("error"),
			null, // No guard expression
			b.blockStatement([
			  // console.error('Database connection error:', error);
			  b.expressionStatement(
				b.callExpression(
				  b.memberExpression(
					b.identifier("console"),
					b.identifier("error")
				  ),
				  [
					b.stringLiteral("Database connection error:"),
					b.identifier("error")
				  ]
				)
			  ),
			  // Comment: // process.exit(1);
			  b.emptyStatement()
			])
		  )
		)
	  ]);
  }else
  if (options.databaseOrm === "mongoose") {
    methodBody = b.blockStatement([
      b.tryStatement(
        b.blockStatement([
          b.variableDeclaration("const", [
            b.variableDeclarator(
              b.identifier("uri"),
              b.templateLiteral(
                [
                  b.templateElement({ raw: "", cooked: "" }, false),
                  b.templateElement({ raw: "", cooked: "" }, true)
                ],
                [
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("MONGODB_URI")
                  )
                ]
              )
            )
          ]),
          b.expressionStatement(
            b.awaitExpression(
              b.callExpression(
                b.memberExpression(b.identifier("mongoose"), b.identifier("connect")),
                [b.identifier("uri")]
              )
            )
          ),
          b.expressionStatement(
            b.callExpression(
              b.memberExpression(b.identifier("console"), b.identifier("log")),
              [b.stringLiteral("Connected to MongoDB")]
            )
          )
        ]),
        b.catchClause(
          b.identifier("error"),
          null, // param defaults to null in newer versions
          b.blockStatement([
            b.expressionStatement(
              b.callExpression(
                b.memberExpression(b.identifier("console"), b.identifier("error")),
                [
                  b.stringLiteral("Error connecting to MongoDB:"),
                  b.identifier("error")
                ]
              )
            ),
            b.throwStatement(b.identifier("error"))
          ])
        )
      )
    ]);
  } else if (options.databaseOrm === "prisma") {
    methodBody = b.blockStatement([
      b.tryStatement(
        b.blockStatement([
          b.expressionStatement(
            b.assignmentExpression(
              "=",
              b.memberExpression(b.thisExpression(), b.identifier("prisma")),
              b.newExpression(b.identifier("PrismaClient"), [])
            )
          ),
          b.expressionStatement(
            b.awaitExpression(
              b.callExpression(
                b.memberExpression(
                  b.memberExpression(b.thisExpression(), b.identifier("prisma")),
                  b.identifier("$connect")
                ),
                []
              )
            )
          ),
          b.expressionStatement(
            b.callExpression(
              b.memberExpression(b.identifier("console"), b.identifier("log")),
              [b.stringLiteral("Connected to database via Prisma")]
            )
          )
        ]),
        b.catchClause(
          b.identifier("error"),
          null, // param defaults to null in newer versions
          b.blockStatement([
            b.expressionStatement(
              b.callExpression(
                b.memberExpression(b.identifier("console"), b.identifier("error")),
                [
                  b.stringLiteral("Error connecting to database:"),
                  b.identifier("error")
                ]
              )
            ),
            b.throwStatement(b.identifier("error"))
          ])
        )
      )
    ]);
  } else {
    // Generic database method for other types
    methodBody = b.blockStatement([
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(b.identifier("console"), b.identifier("log")),
          [b.stringLiteral(`Connecting to ${options.database} database...`)]
        )
      ),
      b.expressionStatement(b.identifier(TEMPLATES.STRINGS.MARKERS.SERVER.DATABASE_CONNECTION))
    ]);
  }
	  // Add method node with async and private modifiers
	  const connectToDatabaseMethod = b.classMethod(
		"method",
		b.identifier("connectToDatabase"),
		[],
		methodBody,
		false,  // not computed
		true,    // is private
	  );
	  connectToDatabaseMethod.comments = [
		b.commentBlock(COMMENTS.SERVER.CONNECT_DATABASE, true)
	  ];
	  // Add async modifier
	  connectToDatabaseMethod.async = true;
	
	  // Add return type annotation
	  connectToDatabaseMethod.returnType = b.tsTypeAnnotation(
		b.tsTypeReference(
		  b.identifier("Promise"),
		  b.tsTypeParameterInstantiation([b.tsVoidKeyword()])
		)
	  );
  return connectToDatabaseMethod
}

/**
 * Function to get WebSocket initialization method
 * @returns Method definition for WebSocket initialization or null if no WebSocket library selected
 */
function getWebSocketMethod(options: GeneratorOptions) {
  if (options.websocketLib === "none") {
    return null;
  }

  // Create a default empty method body to handle the undefined case
  let methodBody: recast.types.namedTypes.BlockStatement;
  
  if (options.websocketLib === "socketio") {
    methodBody = b.blockStatement([
      b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(b.thisExpression(), b.identifier("io")),
          b.newExpression(
            b.tsInstantiationExpression(b.identifier("SocketIOServer")),
            [
              b.memberExpression(b.thisExpression(), b.identifier("server")),
              b.objectExpression([
                b.objectProperty(
                  b.identifier("cors"),
                  b.objectExpression([
                    b.objectProperty(
                      b.identifier("origin"),
                      b.stringLiteral("*")
                    )
                  ])
                )
              ])
            ]
          )
        )
      ),
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(
            b.memberExpression(b.thisExpression(), b.identifier("io")),
            b.identifier("on")
          ),
          [
            b.stringLiteral("connection"),
            b.arrowFunctionExpression(
				[
					Object.assign(b.identifier("socket"), {
					  typeAnnotation: b.tsTypeAnnotation(
						b.tsTypeReference(b.identifier("Socket"))
					  )
					})
				  ],
              b.blockStatement([
                b.expressionStatement(
                  b.callExpression(
                    b.memberExpression(b.identifier("console"), b.identifier("log")),
                    [
                      b.templateLiteral(
                        [
                          b.templateElement({ raw: "Socket connected: ", cooked: "Socket connected: " }, false),
                          b.templateElement({ raw: "", cooked: "" }, true)
                        ],
                        [
                          b.memberExpression(b.identifier("socket"), b.identifier("id"))
                        ]
                      )
                    ]
                  )
                )
              ])
            )
          ]
        )
      )
    ]);
  } else if (options.websocketLib === "ws") {
    methodBody = b.blockStatement([
      b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(b.thisExpression(), b.identifier("wss")),
          b.newExpression(
            b.memberExpression(b.identifier("WebSocket"), b.identifier("Server")),
            [
              b.objectExpression([
                b.objectProperty(
                  b.identifier("server"),
                  b.memberExpression(b.thisExpression(), b.identifier("server"))
                )
              ])
            ]
          )
        )
      ),
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(
            b.memberExpression(b.thisExpression(), b.identifier("wss")),
            b.identifier("on")
          ),
          [
            b.stringLiteral("connection"),
            b.arrowFunctionExpression(
              [b.identifier("ws")],
              b.blockStatement([
                b.expressionStatement(
                  b.callExpression(
                    b.memberExpression(b.identifier("console"), b.identifier("log")),
                    [b.stringLiteral("WebSocket client connected")]
                  )
                )
              ])
            )
          ]
        )
      )
    ]);
  } else {
    // Default case: empty block statement when no websocket lib is selected
    methodBody = b.blockStatement([
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(b.identifier("console"), b.identifier("log")),
          [b.stringLiteral("WebSockets not configured")]
        )
      )
    ]);
  }

  return b.methodDefinition(
    "method",
    b.identifier("initializeWebSockets"),
    b.functionExpression(
      null,
      [],
      methodBody
    )
  );
}

/**
 * Get view engine setup code
 * @returns Array of statements for view engine setup or null if no view engine selected
 */
function getViewEngineSetup(options: GeneratorOptions) {
  if (options.viewEngine === "none") {
    return null;
  }

  const viewStatements: any[] = [];

  // Set views directory
  viewStatements.push(
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(
          b.memberExpression(b.thisExpression(), b.identifier("app")),
          b.identifier("set")
        ),
        [
          b.stringLiteral("views"),
          b.callExpression(
            b.memberExpression(b.identifier("path"), b.identifier("join")),
            [
              b.identifier("__dirname"),
              b.stringLiteral("views")
            ]
          )
        ]
      )
    )
  );

  // Set view engine
  viewStatements.push(
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(
          b.memberExpression(b.thisExpression(), b.identifier("app")),
          b.identifier("set")
        ),
        [
          b.stringLiteral("view engine"),
          b.stringLiteral(options.viewEngine || "")
        ]
      )
    )
  );

  // Additional engine-specific setup
  if (options.viewEngine === "handlebars") {
    viewStatements.push(
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(
            b.memberExpression(b.thisExpression(), b.identifier("app")),
            b.identifier("engine")
          ),
          [
            b.stringLiteral("handlebars"),
            b.callExpression(
              b.identifier("exphbs"),
              [
                b.objectExpression([
                  b.objectProperty(
                    b.identifier("defaultLayout"),
                    b.stringLiteral("main")
                  ),
                  b.objectProperty(
                    b.identifier("extname"),
                    b.stringLiteral(".handlebars")
                  )
                ])
              ]
            )
          ]
        )
      )
    );
  }

  return viewStatements;
}

/**
 * Function to generate the router initialization code
 * @returns Expression statement for router initialization
 */
function getRouterInit(options: GeneratorOptions) {
  if (options.websocketLib === "socketio") {
    return b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("router"),
        b.callExpression(
          b.identifier("initializeRoutes"),
          [
            b.memberExpression(b.thisExpression(), b.identifier("io"))
          ]
        )
      )
    ]);
  } else if (options.websocketLib === "ws") {
    return b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("router"),
        b.callExpression(
          b.identifier("initializeRoutes"),
          [
            b.memberExpression(b.thisExpression(), b.identifier("wss"))
          ]
        )
      )
    ]);
  } else {
    return b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("router"),
        b.callExpression(
          b.identifier("initializeRoutes"),
          []
        )
      )
    ]);
  }
}

/**
 * Function to get the view route handler
 * @returns Expression statement for view route handler or null if no view engine selected
 */
function getViewRouteHandler(options: GeneratorOptions) {
  if (options.viewEngine !== "none") {
    return b.expressionStatement(
      b.callExpression(
        b.memberExpression(
          b.memberExpression(b.thisExpression(), b.identifier("app")),
          b.identifier("get")
        ),
        [
          b.stringLiteral("/"),
          b.arrowFunctionExpression(
            [b.identifier("req"), b.identifier("res")],
            b.blockStatement([
              b.expressionStatement(
                b.callExpression(
                  b.memberExpression(b.identifier("res"), b.identifier("render")),
                  [
                    b.stringLiteral("index"),
                    b.objectExpression([
                      b.objectProperty(
                        b.identifier("title"),
                        b.stringLiteral("Express TypeScript App")
                      )
                    ])
                  ]
                )
              )
            ])
          )
        ]
      )
    );
  }
  // Return an empty statement as a fallback to prevent null return
  return b.emptyStatement();
}

// Gets the arrow function from getViewRouteHandler and adds type annotations to its parameters
function getTypedViewRouteHandler(options: GeneratorOptions) {
  if (options.viewEngine !== "none") {
    const exprStatement = getViewRouteHandler(options);
    if (exprStatement.type === "EmptyStatement") {
      return exprStatement;
    }
    
    // Get the call expression
    const callExpr = exprStatement.expression as any;
    
    // Get the arrow function (second argument of the call)
    const arrowFunc = callExpr.arguments[1] as any;
    
    // Add type annotations to req and res parameters
    const reqParam = arrowFunc.params[0];
    reqParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("Request"))
    );
    
    const resParam = arrowFunc.params[1];
    resParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("Response"))
    );
    
    return exprStatement;
  }
  // Return an empty statement as a fallback to prevent null return
  return b.emptyStatement();
}

/**
 * Helper function to add type annotations to route handler parameters
 * @param arrowFunc Arrow function expression to modify
 */
function addTypeAnnotationsToRouteHandler(arrowFunc: any) {
  // Add type annotations to route handler parameters if they exist
  if (arrowFunc.params.length >= 2) {
    // Check if this is an error handler (4 parameters with first one named 'error')
    if (arrowFunc.params.length >= 4 && arrowFunc.params[0].name === "error") {
      // error: any
      const errorParam = arrowFunc.params[0];
      errorParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsAnyKeyword()
      );
      
      // req: Request (2nd parameter in error handler)
      const reqParam = arrowFunc.params[1];
      reqParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Request"))
      );
      
      // res: Response (3rd parameter in error handler)
      const resParam = arrowFunc.params[2];
      resParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Response"))
      );
      
      // next: NextFunction (4th parameter in error handler)
      const nextParam = arrowFunc.params[3];
      nextParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("NextFunction"))
      );
    } else {
      // Regular route handler
      // req: Request
      const reqParam = arrowFunc.params[0];
      reqParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Request"))
      );
      
      // res: Response
      const resParam = arrowFunc.params[1];
      resParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Response"))
      );
      
      // next: NextFunction (if present)
      if (arrowFunc.params.length >= 3) {
        const nextParam = arrowFunc.params[2];
        nextParam.typeAnnotation = b.tsTypeAnnotation(
          b.tsTypeReference(b.identifier("NextFunction"))
        );
      }
    }
  }
}

/**
 * Generates the server AST with provided options
 * @param options Template options 
 * @returns AST for server.ts file
 */
export default function generateServerAST(opts: GeneratorOptions) {
  // Build the AST for our server.ts file
  return b.program([
    ...getImports(opts),
    // export class Server { ... }
    (() => {
      // Create the export declaration
      const exportDecl = b.exportNamedDeclaration(
        b.classDeclaration(
          b.identifier("Server"),
          b.classBody([
            // Class properties from options
            ...getClassProperties(opts),
            // static bootstrap(): Server { return new Server(); }
            (() => {
              const bootstrapMethod = b.methodDefinition(
                "method",
                b.identifier("bootstrap"),
                b.functionExpression(
                  null,
                  [],
                  b.blockStatement([
                    b.returnStatement(
                      b.newExpression(b.identifier("Server"), [])
                    )
                  ])
                ),
                true // static method
              );
              bootstrapMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.BOOTSTRAP_METHOD, true)
              ];
              return bootstrapMethod;
            })(),
            // constructor() { ... }
            (() => {
              const constructorMethod = getConstructorMethod(opts);
              constructorMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.CONSTRUCTOR_METHOD, true)
              ];
              return constructorMethod;
            })(),
            // private initializeMiddlewares(): void { ... }
            (() => {
              const initMiddlewaresMethod = b.methodDefinition(
                "method",
                b.identifier("initializeMiddlewares"),
                b.functionExpression(
                  null,
                  [],
                  b.blockStatement([
                    // this.app.use(helmet());
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(b.thisExpression(), b.identifier("app")),
                          b.identifier("use")
                        ),
                        [b.callExpression(b.identifier("helmet"), [])]
                      )
                    ),
                    // this.app.use(cors());
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(b.thisExpression(), b.identifier("app")),
                          b.identifier("use")
                        ),
                        [b.callExpression(b.identifier("cors"), [])]
                      )
                    ),
                    // this.app.use(morgan('dev'));
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(b.thisExpression(), b.identifier("app")),
                          b.identifier("use")
                        ),
                        [b.callExpression(b.identifier("morgan"), [b.stringLiteral("dev")])]
                      )
                    ),
                    // this.app.use(express.json());
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(b.thisExpression(), b.identifier("app")),
                          b.identifier("use")
                        ),
                        [b.callExpression(
                          b.memberExpression(b.identifier("express"), b.identifier("json")),
                          []
                        )]
                      )
                    ),
                    // this.app.use(express.urlencoded({ extended: true }));
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(b.thisExpression(), b.identifier("app")),
                          b.identifier("use")
                        ),
                        [b.callExpression(
                          b.memberExpression(b.identifier("express"), b.identifier("urlencoded")),
                          [b.objectExpression([
                            b.objectProperty(
                              b.identifier("extended"),
                              b.booleanLiteral(true)
                            )
                          ])]
                        )]
                      )
                    ),
                    // View engine setup if needed
                    ...(getViewEngineSetup(opts) || [])
                  ])
                )
              );
              initMiddlewaresMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.INITIALIZE_MIDDLEWARES, true)
              ];
              return initMiddlewaresMethod;
            })(),
            // Database method if needed
			...((getDatabaseMethod(opts)? [(()=>{
				const dbMethod = getDatabaseMethod(opts);
				if (dbMethod) {
					dbMethod.comments = [
					  b.commentBlock(COMMENTS.SERVER.CONNECT_DATABASE, true)
					];
				  }
              	return dbMethod;
			})()]: [])),
            // WebSocket method if needed
            ...((getWebSocketMethod(opts) ? [(() => {
              const wsMethod = getWebSocketMethod(opts);
              if (wsMethod) {
                wsMethod.comments = [
                  b.commentBlock(COMMENTS.SERVER.INITIALIZE_WEBSOCKETS, true)
                ];
              }
              return wsMethod;
            })()] : [])),
            // private initializeRoutes(): void { ... }
            (() => {
              const initRoutesMethod = b.methodDefinition(
                "method",
                b.identifier("initializeRoutes"),
                b.functionExpression(
                  null,
                  [],
                  b.blockStatement([
                    // Initialize router with or without websocket server
                    getRouterInit(opts),
                    // this.app.use('/api', router);
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(b.thisExpression(), b.identifier("app")),
                          b.identifier("use")
                        ),
                        [b.stringLiteral("/api"), b.identifier("router")]
                      )
                    ),
                    // this.app.use("/api/*", (req, res) => { ... });
                    (() => {
                      const notFoundHandler = b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.memberExpression(b.thisExpression(), b.identifier("app")),
                            b.identifier("use")
                          ),
                          [
                            b.stringLiteral("/api/*"),
                            b.arrowFunctionExpression(
                              [b.identifier("req"), b.identifier("res")],
                              b.blockStatement([
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(
                                      b.callExpression(
                                        b.memberExpression(b.identifier("res"), b.identifier("status")),
                                        [b.numericLiteral(404)]
                                      ),
                                      b.identifier("json")
                                    ),
                                    [b.objectExpression([
                                      b.objectProperty(
                                        b.identifier("error"), 
                                        b.stringLiteral("Not Found")
                                      )
                                    ])]
                                  )
                                )
                              ])
                            )
                          ]
                        )
                      );
                      
                      // Add type annotations to route handler parameters
                      const callExpr = notFoundHandler.expression as any;
                      const arrowFunc = callExpr.arguments[1];
                      addTypeAnnotationsToRouteHandler(arrowFunc);
                      
                      return notFoundHandler;
                    })(),
                    // Add view route handler if needed
                    ...(getTypedViewRouteHandler(opts) ? [getTypedViewRouteHandler(opts)] : [])
                  ])
                )
              );
              initRoutesMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.INITIALIZE_ROUTES, true)
              ];
              return initRoutesMethod;
            })(),
            // private initializeErrorHandling(): void { ... }
            (() => {
              const errorHandlingMethod = b.methodDefinition(
                "method",
                b.identifier("initializeErrorHandling"),
                b.functionExpression(
                  null,
                  [],
                  b.blockStatement([
                    // 404 handler
                    (() => {
                      const notFoundHandler = b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.memberExpression(b.thisExpression(), b.identifier("app")),
                            b.identifier("use")
                          ),
                          [
                            b.arrowFunctionExpression(
                              [b.identifier("req"), b.identifier("res")],
                              b.blockStatement([
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(
                                      b.callExpression(
                                        b.memberExpression(b.identifier("res"), b.identifier("status")),
                                        [b.numericLiteral(404)]
                                      ),
                                      b.identifier("json")
                                    ),
                                    [b.objectExpression([
                                      b.objectProperty(
                                        b.identifier("message"), 
                                        b.stringLiteral("Not Found")
                                      )
                                    ])]
                                  )
                                )
                              ])
                            )
                          ]
                        )
                      );
                      
                      // Add type annotations to route handler parameters
                      const callExpr = notFoundHandler.expression as any;
                      const arrowFunc = callExpr.arguments[0];
                      addTypeAnnotationsToRouteHandler(arrowFunc);
                      
                      return notFoundHandler;
                    })(),
                    // Global error handler
                    (() => {
                      const errorHandler = b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.memberExpression(b.thisExpression(), b.identifier("app")),
                            b.identifier("use")
                          ),
                          [
                            b.arrowFunctionExpression(
                              [
                                b.identifier("error"),
                                b.identifier("req"),
                                b.identifier("res"),
                                b.identifier("next")
                              ],
                              b.blockStatement([
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(b.identifier("console"), b.identifier("error")),
                                    [b.identifier("error")]
                                  )
                                ),
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(
                                      b.callExpression(
                                        b.memberExpression(b.identifier("res"), b.identifier("status")),
                                        [b.numericLiteral(500)]
                                      ),
                                      b.identifier("json")
                                    ),
                                    [b.objectExpression([
                                      b.objectProperty(
                                        b.identifier("message"), 
                                        b.stringLiteral("Internal Server Error")
                                      )
                                    ])]
                                  )
                                )
                              ])
                            )
                          ]
                        )
                      );
                      
                      // Add type annotations to route handler parameters
                      const callExpr = errorHandler.expression as any;
                      const arrowFunc = callExpr.arguments[0];
                      addTypeAnnotationsToRouteHandler(arrowFunc);
                      
                      return errorHandler;
                    })()
                  ])
                )
              );
              errorHandlingMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.INITIALIZE_ERROR_HANDLING, true)
              ];
              return errorHandlingMethod;
            })(),
            // public listen(port: number): void { ... }
            (() => {
				const errorHandlingBlock = b.blockStatement([
					// const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
					b.variableDeclaration("const", [
					  b.variableDeclarator(
						b.identifier("bind"),
						b.conditionalExpression(
						  b.binaryExpression(
							"===",
							b.unaryExpression("typeof", b.identifier("port"), true),
							b.stringLiteral("string")
						  ),
						  b.binaryExpression("+", b.stringLiteral("Pipe "), b.identifier("port")),
						  b.binaryExpression("+", b.stringLiteral("Port "), b.identifier("port"))
						)
					  )
					]),
					// switch (error.code) { ... }
					b.switchStatement(
					  b.memberExpression(b.identifier("err"), b.identifier("name")),
					  [
						// case "EACCES":
						b.switchCase(
						  b.stringLiteral("EACCES"),
						  [
							b.expressionStatement(
							  b.callExpression(
								b.memberExpression(b.identifier("console"), b.identifier("error")),
								[
								  b.binaryExpression(
									"+",
									b.identifier("bind"),
									b.identifier("err.message"),
								  )
								]
							  )
							),
							b.expressionStatement(
							  b.callExpression(
								b.memberExpression(b.identifier("process"), b.identifier("exit")),
								[b.numericLiteral(1)]
							  )
							),
							b.breakStatement()
						  ]
						),
						// case "EADDRINUSE":
						b.switchCase(
						  b.stringLiteral("EADDRINUSE"),
						  [
							b.expressionStatement(
							  b.callExpression(
								b.memberExpression(b.identifier("console"), b.identifier("error")),
								[
								  b.binaryExpression(
									"+",
									b.identifier("bind"),
									b.identifier("err.message"),
								  )
								]
							  )
							),
							b.expressionStatement(
							  b.callExpression(
								b.memberExpression(b.identifier("process"), b.identifier("exit")),
								[b.numericLiteral(1)]
							  )
							),
							b.breakStatement()
						  ]
						),
						// default:
						b.switchCase(
						  null,
						  [
							b.throwStatement(b.identifier("err"))
						  ]
						)
					  ]
					)
				  ]);
				  
              const listenMethod = b.methodDefinition(
                "method",
                b.identifier("listen"),
                b.functionExpression(
                  null,
                  [b.identifier("port")],
                  b.blockStatement([
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(b.thisExpression(), b.identifier("server")),
                          b.identifier("listen")
                        ),
                        [
                          b.identifier("port"),
                          b.arrowFunctionExpression(
                            [],
                            b.blockStatement([
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(b.identifier("console"), b.identifier("log")),
                                  [
                                    b.templateLiteral(
                                      [
                                        b.templateElement({ raw: "Server running on port ", cooked: "Server running on port " }, false),
                                        b.templateElement({ raw: "", cooked: "" }, true)
                                      ],
                                      [b.identifier("port")]
                                    )
                                  ]
                                )
                              )
                            ])
                          )
                        ]
                      )
                    ),
					b.expressionStatement(
						b.callExpression(
						  b.memberExpression(
							b.memberExpression(b.thisExpression(), b.identifier("server")),
							b.identifier("on")
						  ),
						  [
							b.stringLiteral("error"),
							b.arrowFunctionExpression(
							  [b.identifier("err")],
							  errorHandlingBlock
							)
						  ]
						)
					)
                  ])
                )
              );
              
              // Add type annotation to port parameter
              const portParam = listenMethod.value.params[0] as any;
              portParam.typeAnnotation = b.tsTypeAnnotation(
                b.tsNumberKeyword()
              );
              
              // Add return type annotation to the method
              listenMethod.value.returnType = b.tsTypeAnnotation(
                b.tsVoidKeyword()
              );
              
              listenMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.LISTEN_METHOD, true)
              ];
              return listenMethod;
            })()
          ]),
          null // no superclass
        ),
        []
      );
      
      // Add the server class comment to the export declaration, not the class
      exportDecl.comments = [
        b.commentBlock(COMMENTS.SERVER.SERVER_CLASS, true)
      ];
      
      return exportDecl;
    })()
  ]);
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
} 