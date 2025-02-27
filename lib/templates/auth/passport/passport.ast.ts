/**
 * AST Template for auth/passport/passport.ts
 * This file is processed by the AST template processor and generates the Passport.js configuration
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  [key: string]: any;
}

/**
 * Generates the Passport.js configuration AST with provided options
 * @param options Template options
 * @returns AST for auth/passport/passport.ts file
 */
export default function generatePassportConfigAST(options: TemplateOptions = {}) {
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("passport"))],
      b.stringLiteral("passport")
    ),
    b.importDeclaration(
      [
        b.importSpecifier(b.identifier("Strategy")),
        b.importSpecifier(b.identifier("ExtractJwt"))
      ],
      b.stringLiteral("passport-jwt")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("Example"))],
      b.stringLiteral("../models/example")
    ),
    b.importDeclaration(
      [
        b.importSpecifier(b.identifier("Request")),
        b.importSpecifier(b.identifier("Response")),
        b.importSpecifier(b.identifier("NextFunction"))
      ],
      b.stringLiteral("express")
    )
  ];

  // JWT Options const declaration
  const jwtOptionsDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("opts"),
      b.objectExpression([
        b.objectProperty(
          b.identifier("jwtFromRequest"),
          b.callExpression(
            b.memberExpression(
              b.identifier("ExtractJwt"),
              b.identifier("fromAuthHeaderAsBearerToken")
            ),
            []
          )
        ),
        b.objectProperty(
          b.identifier("secretOrKey"),
          b.stringLiteral("your-secret-key")
        ),
        // Use proper comments instead of trying to make commented properties
        // Regular object properties for now, can be commented in the final output with recast
        b.objectProperty(
          b.identifier("issuer"),
          b.stringLiteral("")
        ),
        b.objectProperty(
          b.identifier("audience"),
          b.stringLiteral("")
        )
      ])
    )
  ]);
  const strategyCallback = b.functionExpression( null,
	[b.identifier("jwt_payload"), b.identifier("done")],
	b.blockStatement([
	  // let user;
	  b.variableDeclaration("let", [
		b.variableDeclarator(b.identifier("user"))
	  ]),
	  
	  // try-catch block
	  b.tryStatement(
		b.blockStatement([
		  // user = await Example.findOne({ where: { id: jwt_payload._id } });
		  b.expressionStatement(
			b.assignmentExpression(
			  "=",
			  b.identifier("user"),
			  b.awaitExpression(
				b.callExpression(
				  b.memberExpression(
					b.identifier("Example"),
					b.identifier("findOne")
				  ),
				  [
					b.objectExpression([
					  b.objectProperty(
						b.identifier("where"),
						b.objectExpression([
						  b.objectProperty(
							b.identifier("id"),
							b.memberExpression(
							  b.identifier("jwt_payload"),
							  b.identifier("_id")
							)
						  )
						])
					  )
					])
				  ]
				)
			  )
			)
		  ),
		  
		  // return done(null, user);
		  b.returnStatement(
			b.callExpression(b.identifier("done"), [
				b.nullLiteral(),
				b.logicalExpression(
				  "||",
				  b.identifier("user"),
				  b.booleanLiteral(false)
				)
			  ])
		  )
		]),
		
		// catch block
		b.catchClause(
		  b.identifier("e"),
		  null,
		  b.blockStatement([
			// return done(e, false);
			b.returnStatement(
			  b.callExpression(b.identifier("done"), [
				b.identifier("e"),
				b.booleanLiteral(false)
			  ])
			)
		  ])
		)
	  )
	]),
	false,  // Not a generator
	true    // Async function
  );
  strategyCallback.async = true;
  // Passport strategy setup
  const passportUseStatement = b.expressionStatement(
    b.callExpression(
      b.memberExpression(b.identifier("passport"), b.identifier("use")),
      [
        b.newExpression(b.identifier("Strategy"), [
          b.identifier("opts"), 
		  strategyCallback          
        ])
      ]
    )
  );

  // Passport serializeUser
  const serializeUserStatement = b.expressionStatement(
    b.callExpression(
      b.memberExpression(b.identifier("passport"), b.identifier("serializeUser")),
      [
        b.functionExpression(
          null,
          [b.identifier("user"), b.identifier("done")],
          b.blockStatement([
            b.expressionStatement(
              b.callExpression(b.identifier("done"), [
                b.nullLiteral(),
                b.identifier("user")
              ])
            )
          ])
        )
      ]
    )
  );
  const deserializeCallback = b.functionExpression(
	null,
	[
	  // user parameter with type annotation
	  b.identifier("user"),
	  b.identifier("done")
	],
	b.blockStatement([
	  // const fetchedUser = Example.findOne({ where: { id: user._id } });
	  b.variableDeclaration("const", [
		b.variableDeclarator(
		  b.identifier("fetchedUser"),
		  b.callExpression(
			b.memberExpression(b.identifier("Example"), b.identifier("findOne")),
			[
			  b.objectExpression([
				b.objectProperty(
				  b.identifier("where"),
				  b.objectExpression([
					b.objectProperty(
					  b.identifier("id"),
					  b.memberExpression(b.identifier("user"), b.identifier("_id"))
					)
				  ])
				)
			  ])
			]
		  )
		)
	  ]),
	  
	  // done(null, fetchedUser);
	  b.expressionStatement(
		b.callExpression(b.identifier("done"), [
		  b.nullLiteral(),
		  b.identifier("fetchedUser")
		])
	  )
	])
  );
  deserializeCallback.async = true;
  // Passport deserializeUser
  const deserializeUserStatement = b.expressionStatement(
    b.callExpression(
      b.memberExpression(b.identifier("passport"), b.identifier("deserializeUser")),
      [
        deserializeCallback
      ]
    )
  );

  // Create a type annotation for the user parameter
  const userParamTypeAnnotation = b.tsTypeAnnotation(
    b.tsAnyKeyword()
  );

  // Get the function expression of deserializeUserStatement
  const deserializeExpr = (deserializeUserStatement.expression as recast.types.namedTypes.CallExpression)
    .arguments[0] as recast.types.namedTypes.FunctionExpression;
  
  // Get the user parameter
  const userParam = deserializeExpr.params[0] as recast.types.namedTypes.Identifier;
  
  // Add type annotation to user parameter
  userParam.typeAnnotation = userParamTypeAnnotation;

  // Authenticate function
  const authenticateFunction = b.exportNamedDeclaration(
    b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("authenticate"),
        b.arrowFunctionExpression(
          [
            b.identifier("req"),
            b.identifier("res"),
            b.identifier("next")
          ],
          b.blockStatement([
            // passport.authenticate("jwt", { session: false }, (err: Error, user: any) => { ... })(req, res, next);
            b.expressionStatement(
              b.callExpression(
                b.callExpression(
                  b.memberExpression(b.identifier("passport"), b.identifier("authenticate")),
                  [
                    b.stringLiteral("jwt"),
                    b.objectExpression([
                      b.objectProperty(
                        b.identifier("session"),
                        b.booleanLiteral(false)
                      )
                    ]),
                    b.arrowFunctionExpression(
                      [
                        // err: Error parameter
                        b.identifier("err"),
                        // user: any parameter
                        b.identifier("user")
                      ],
                      b.blockStatement([
                        // if (err) { return next(err); }
                        b.ifStatement(
                          b.identifier("err"),
                          b.blockStatement([
                            b.returnStatement(
                              b.callExpression(b.identifier("next"), [b.identifier("err")])
                            )
                          ])
                        ),
                        
                        // if (!user) { return res.status(401).json({ message: "Unauthorized" }); }
                        b.ifStatement(
                          b.unaryExpression("!", b.identifier("user")),
                          b.blockStatement([
                            b.returnStatement(
                              b.callExpression(
                                b.memberExpression(
                                  b.callExpression(
                                    b.memberExpression(b.identifier("res"), b.identifier("status")),
                                    [b.numericLiteral(401)]
                                  ),
                                  b.identifier("json")
                                ),
                                [
                                  b.objectExpression([
                                    b.objectProperty(
                                      b.identifier("message"),
                                      b.stringLiteral("Unauthorized")
                                    )
                                  ])
                                ]
                              )
                            )
                          ])
                        ),
                        
                        // req.user = user;
                        b.expressionStatement(
                          b.assignmentExpression(
                            "=",
                            b.memberExpression(b.identifier("req"), b.identifier("user")),
                            b.identifier("user")
                          )
                        ),
                        
                        // return next();
                        b.returnStatement(
                          b.callExpression(b.identifier("next"), [])
                        )
                      ])
                    )
                  ]
                ),
                [
                  b.identifier("req"),
                  b.identifier("res"),
                  b.identifier("next")
                ]
              )
            )
          ])
        )
      )
    ]),
    []
  );

  // Get the auth function declaration
  const authFunc = authenticateFunction.declaration as recast.types.namedTypes.VariableDeclaration;
  
  // Get the variable declarator
  const authVarDeclarator = authFunc.declarations[0] as recast.types.namedTypes.VariableDeclarator;
  
  // Get the arrow function expression
  const authArrowFunc = (authVarDeclarator as any).init as recast.types.namedTypes.ArrowFunctionExpression;
  
  // Add type annotations to parameters
  // req: Request
  const reqParam = authArrowFunc.params[0] as recast.types.namedTypes.Identifier;
  reqParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("Request"))
  );
  
  // res: Response
  const resParam = authArrowFunc.params[1] as recast.types.namedTypes.Identifier;
  resParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("Response"))
  );
  
  // next: NextFunction
  const nextParam = authArrowFunc.params[2] as recast.types.namedTypes.Identifier;
  nextParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("NextFunction"))
  );

  // Add type annotations to authenticate callback parameters
  const callbackExp = ((((authArrowFunc.body as recast.types.namedTypes.BlockStatement)
    .body[0] as recast.types.namedTypes.ExpressionStatement)
    .expression as recast.types.namedTypes.CallExpression)
    .callee as recast.types.namedTypes.CallExpression)
    .arguments[2] as recast.types.namedTypes.ArrowFunctionExpression;
  
  // err: Error
  const errParam = callbackExp.params[0] as recast.types.namedTypes.Identifier;
  errParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("Error"))
  );
  
  // user: any
  const userCallbackParam = callbackExp.params[1] as recast.types.namedTypes.Identifier;
  userCallbackParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsAnyKeyword()
  );

  // generateToken function
  const generateTokenFunction = b.exportNamedDeclaration(
    b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("generateToken"),
        b.arrowFunctionExpression(
          [
            // user: any parameter
            b.identifier("user")
          ],
          b.blockStatement([
            // const payload = { id: user.id, email: user.email };
            b.variableDeclaration("const", [
              b.variableDeclarator(
                b.identifier("payload"),
                b.objectExpression([
                  b.objectProperty(
                    b.identifier("id"),
                    b.memberExpression(b.identifier("user"), b.identifier("id"))
                  ),
                  b.objectProperty(
                    b.identifier("email"),
                    b.memberExpression(b.identifier("user"), b.identifier("email"))
                  )
                ])
              )
            ]),
            
            // return jwt.sign(...);
            b.returnStatement(
				b.callExpression(
				  b.memberExpression(b.identifier("jwt"), b.identifier("sign")),
				  [
					b.identifier("payload"),
					// secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "your-secret-key"
					b.conditionalExpression(
					  b.memberExpression(
						b.memberExpression(b.identifier("process"), b.identifier("env")),
						b.identifier("JWT_SECRET")
					  ),
					  b.memberExpression(
						b.memberExpression(b.identifier("process"), b.identifier("env")),
						b.identifier("JWT_SECRET")
					  ),
					  b.stringLiteral("your-secret-key")
					),
					// options: { expiresIn: process.env.JWT_EXPIRES_IN ? process.env.JWT_EXPIRES_IN : 15 }
					b.objectExpression([
					  b.objectProperty(
						b.identifier("expiresIn"),
						b.conditionalExpression(
						  b.memberExpression(
							b.memberExpression(b.identifier("process"), b.identifier("env")),
							b.identifier("JWT_EXPIRES_IN")
						  ),
						  b.callExpression(
							b.identifier("Number"),
							[
							  b.memberExpression(
								b.memberExpression(b.identifier("process"), b.identifier("env")),
								b.identifier("JWT_EXPIRES_IN")
							  )
							]
						  ),
						  b.numericLiteral(15)
						)
					  )
					])
				  ]
				)
			  )
          ])
        )
      )
    ]),
    []
  );

  // Get the generateToken function declaration
  const genTokenFunc = generateTokenFunction.declaration as recast.types.namedTypes.VariableDeclaration;
  
  // Get the variable declarator
  const genTokenVarDeclarator = genTokenFunc.declarations[0] as recast.types.namedTypes.VariableDeclarator;
  
  // Get the arrow function expression
  const genTokenArrowFunc = (genTokenVarDeclarator as any).init as recast.types.namedTypes.ArrowFunctionExpression;
  
  // Add type annotation to user parameter
  const userGenTokenParam = genTokenArrowFunc.params[0] as recast.types.namedTypes.Identifier;
  userGenTokenParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsAnyKeyword()
  );
  
  // Add return type annotation
  genTokenArrowFunc.returnType = b.tsTypeAnnotation(
    b.tsStringKeyword()
  );

  // JWT import for the generateToken function
  const jwtImport = b.importDeclaration(
    [b.importDefaultSpecifier(b.identifier("jwt"))],
    b.stringLiteral("jsonwebtoken")
  );
  imports.push(jwtImport);

  // Default export
  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("passport")
  );

  // Build the AST program
  const ast = recast.parse('', { parser: tsParser });
  const body = ast.program.body;

  // Add imports
  imports.forEach(imp => body.push(imp));
  
  // Add JWT options declaration
  body.push(jwtOptionsDeclaration);
  
  // Add JSDoc comment for passport strategy as a string literal
  body.push(b.expressionStatement(b.stringLiteral("/** Configure Passport.js */")));
  
  // Add passport use statement
  body.push(passportUseStatement);
  body.push(serializeUserStatement);
  body.push(deserializeUserStatement);
  
  // Add JSDoc comment for authenticate function
  body.push(b.expressionStatement(b.stringLiteral("/** Authentication middleware for protecting routes */")));
  
  // Add authenticate function
  body.push(authenticateFunction);
  
  // Add JSDoc comment for generateToken function
  body.push(b.expressionStatement(b.stringLiteral("/** Generate JWT token for a user */")));
  
  // Add generateToken function
  body.push(generateTokenFunction);
  
  // Add default export
  body.push(defaultExport);

  return ast.program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.print(ast, { parser: tsParser }).code;
} 