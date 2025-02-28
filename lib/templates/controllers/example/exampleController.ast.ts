/**
 * AST Template for controllers/example/exampleController.ts
 * This file is processed by the AST template processor and generates the example controller
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';
import { COMMENTS } from '../../../constants/templates/index.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  websocketLib?: string;
  [key: string]: any;
}

/**
 * Generates the example controller AST with provided options
 * @param options Template options
 * @returns AST for controllers/example/exampleController.ts file
 */
export default function generateExampleControllerAST(options: TemplateOptions = {}) {
  // Provide defaults for options
  const opts = {
    websocketLib: options.websocketLib || "none",
    ...options
  };

  // Import declarations
  const controllerImports = [
    b.importDeclaration(
      [
        b.importSpecifier(b.identifier("Request")),
        b.importSpecifier(b.identifier("Response")),
        b.importSpecifier(b.identifier("NextFunction"))
      ],
      b.stringLiteral("express")
    ),
  ];

  // Add WebSocket imports if needed
  if (opts.websocketLib === "socketio") {
    controllerImports.push(
      b.importDeclaration(
        [b.importSpecifier(b.identifier("Server"), b.identifier("SocketServer"))],
        b.stringLiteral("socket.io")
      )
    );
  }

  // Create Example interface
  const exampleInterface = b.tsInterfaceDeclaration(
    b.identifier("Example"),
    b.tsInterfaceBody([
      b.tsPropertySignature(
        b.identifier("id"),
        b.tsTypeAnnotation(b.tsNumberKeyword())
      ),
      b.tsPropertySignature(
        b.identifier("name"),
        b.tsTypeAnnotation(b.tsStringKeyword())
      ),
      b.tsPropertySignature(
        b.identifier("description"),
        b.tsTypeAnnotation(b.tsStringKeyword())
      ),
      b.tsPropertySignature(
        b.identifier("isActive"),
        b.tsTypeAnnotation(b.tsBooleanKeyword())
      )
    ])
  );

  // Add JSDoc comment to the interface
  exampleInterface.comments = [
    b.commentBlock(COMMENTS.CONTROLLER.EXAMPLE_MODEL, true)
  ];

  // Create socket parameter with optional type annotation
  const createSocketParam = () => {
    const ioParam = b.identifier("io");
    ioParam.optional = true;
    ioParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("SocketServer"))
    );
    return ioParam;
  };

  // Create request parameters with type annotations
  const createReqResNextParams = () => {
    const reqParam = b.identifier("req");
    reqParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("Request"))
    );
    
    const resParam = b.identifier("res");
    resParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("Response"))
    );
    
    const nextParam = b.identifier("next");
    nextParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("NextFunction"))
    );

    return [reqParam, resParam, nextParam];
  };

  // Create the getAllController factory function
  const getAllControllerFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("createGetAllController"),
      opts.websocketLib === "socketio" ? [createSocketParam()] : [],
      b.blockStatement([
        b.returnStatement(
          // Create function expression
          b.functionExpression(
            b.identifier("getAll"), // Named function expression
            createReqResNextParams(),
            b.blockStatement([
              b.tryStatement(
                b.blockStatement([
                  // Example implementation - replace with actual data access
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.identifier("examples"),
                      b.arrayExpression([
                        b.objectExpression([
                          b.objectProperty(b.identifier("id"), b.numericLiteral(1)),
                          b.objectProperty(b.identifier("name"), b.stringLiteral("Example 1")),
                          b.objectProperty(b.identifier("description"), b.stringLiteral("Description 1")),
                          b.objectProperty(b.identifier("isActive"), b.booleanLiteral(true))
                        ]),
                        b.objectExpression([
                          b.objectProperty(b.identifier("id"), b.numericLiteral(2)),
                          b.objectProperty(b.identifier("name"), b.stringLiteral("Example 2")),
                          b.objectProperty(b.identifier("description"), b.stringLiteral("Description 2")),
                          b.objectProperty(b.identifier("isActive"), b.booleanLiteral(true))
                        ])
                      ])
                    )
                  ]),
                  
                  // Example of using socket.io to emit an event if available
                  opts.websocketLib === "socketio" ? 
                    b.ifStatement(
                      b.identifier("io"),
                      b.blockStatement([
                        b.expressionStatement(
                          b.callExpression(
                            b.memberExpression(b.identifier("io"), b.identifier("emit")),
                            [
                              b.stringLiteral("examples:fetched"),
                              b.objectExpression([
                                b.objectProperty(
                                  b.identifier("count"),
                                  b.memberExpression(b.identifier("examples"), b.identifier("length"))
                                )
                              ])
                            ]
                          )
                        )
                      ])
                    ) : b.emptyStatement(),
                  
                  // Return the response
                  b.expressionStatement(
                    b.callExpression(
                      b.memberExpression(b.identifier("res"), b.identifier("json")),
                      [b.identifier("examples")]
                    )
                  )
                ]),
                b.catchClause(
                  b.identifier("error"),
                  null,
                  b.blockStatement([
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("console"), b.identifier("error")),
                        [b.stringLiteral("Error fetching examples:"), b.identifier("error")]
                      )
                    ),
                    b.expressionStatement(
                      b.callExpression(b.identifier("next"), [b.identifier("error")])
                    )
                  ])
                )
              )
            ])
          )
        )
      ])
    ),
    []
  );

  // Get the function expression from the return statement - need to cast to access the proper types
  const getAllFunctionDecl = getAllControllerFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  const getAllReturnStmt = getAllFunctionDecl.body.body[0] as recast.types.namedTypes.ReturnStatement;
  const getAllFunction = getAllReturnStmt.argument as recast.types.namedTypes.FunctionExpression;
  
  // Explicitly set async to true
  getAllFunction.async = true;

  // Add return type annotation
  getAllFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([b.tsVoidKeyword()])
    )
  );

  // Add JSDoc comment to the getAllController function
  getAllControllerFunction.comments = [
    b.commentBlock(COMMENTS.CONTROLLER.GETALL_CONTROLLER, true)
  ];

  // Create the getByIdController factory function
  const getByIdControllerFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("createGetByIdController"),
      opts.websocketLib === "socketio" ? [createSocketParam()] : [],
      b.blockStatement([
        b.returnStatement(
          // Create function expression
          b.functionExpression(
            b.identifier("getById"), // Named function expression
            createReqResNextParams(),
            b.blockStatement([
              b.tryStatement(
                b.blockStatement([
                  // Parse ID from request params
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.identifier("id"),
                      b.callExpression(
                        b.identifier("parseInt"),
                        [
                          b.memberExpression(
                            b.memberExpression(b.identifier("req"), b.identifier("params")),
                            b.identifier("id")
                          ),
                          b.numericLiteral(10)
                        ]
                      )
                    )
                  ]),
                  
                  // Example implementation - replace with actual data access
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.identifier("example"),
                      b.objectExpression([
                        b.objectProperty(b.identifier("id"), b.identifier("id")),
                        b.objectProperty(
                          b.identifier("name"),
                          b.binaryExpression(
                            "+",
                            b.stringLiteral("Example "),
                            b.identifier("id")
                          )
                        ),
                        b.objectProperty(
                          b.identifier("description"),
                          b.binaryExpression(
                            "+",
                            b.stringLiteral("Description "),
                            b.identifier("id")
                          )
                        ),
                        b.objectProperty(b.identifier("isActive"), b.booleanLiteral(true))
                      ])
                    )
                  ]),
                  
                  // Example of using socket.io to emit an event if available
                  opts.websocketLib === "socketio" ? 
                    b.ifStatement(
                      b.identifier("io"),
                      b.blockStatement([
                        b.expressionStatement(
                          b.callExpression(
                            b.memberExpression(b.identifier("io"), b.identifier("emit")),
                            [
                              b.stringLiteral("example:fetched"),
                              b.objectExpression([
                                b.objectProperty(b.identifier("id"), b.identifier("id"))
                              ])
                            ]
                          )
                        )
                      ])
                    ) : b.emptyStatement(),
                  
                  // Return the response
                  b.expressionStatement(
                    b.callExpression(
                      b.memberExpression(b.identifier("res"), b.identifier("json")),
                      [b.identifier("example")]
                    )
                  )
                ]),
                b.catchClause(
                  b.identifier("error"),
                  null,
                  b.blockStatement([
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("console"), b.identifier("error")),
                        [b.stringLiteral("Error fetching example:"), b.identifier("error")]
                      )
                    ),
                    b.expressionStatement(
                      b.callExpression(b.identifier("next"), [b.identifier("error")])
                    )
                  ])
                )
              )
            ])
          )
        )
      ])
    ),
    []
  );

  // Get the function expression from the return statement - need to cast to access the proper types
  const getByIdFunctionDecl = getByIdControllerFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  const getByIdReturnStmt = getByIdFunctionDecl.body.body[0] as recast.types.namedTypes.ReturnStatement;
  const getByIdFunction = getByIdReturnStmt.argument as recast.types.namedTypes.FunctionExpression;
  
  // Explicitly set async to true
  getByIdFunction.async = true;

  // Add return type annotation
  getByIdFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([b.tsVoidKeyword()])
    )
  );

  // Add JSDoc comment to the getByIdController function
  getByIdControllerFunction.comments = [
    b.commentBlock(COMMENTS.CONTROLLER.GETBYID_CONTROLLER, true)
  ];

  // Create the createController factory function
  const createControllerFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("createCreateController"),
      opts.websocketLib === "socketio" ? [createSocketParam()] : [],
      b.blockStatement([
        b.returnStatement(
          // Create function expression
          b.functionExpression(
            b.identifier("create"), // Named function expression
            createReqResNextParams(),
            b.blockStatement([
              b.tryStatement(
                b.blockStatement([
                  // Destructure request body
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.objectPattern([
                        b.objectProperty(b.identifier("name"), b.identifier("name")),
                        b.objectProperty(b.identifier("description"), b.identifier("description")),
                        b.objectProperty(b.identifier("isActive"), b.identifier("isActive"))
                      ]),
                      b.memberExpression(b.identifier("req"), b.identifier("body"))
                    )
                  ]),
                  
                  // Example implementation - replace with actual data access
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.identifier("newExample"),
                      b.objectExpression([
                        b.objectProperty(
                          b.identifier("id"),
                          b.callExpression(
                            b.memberExpression(b.identifier("Date"), b.identifier("now")),
                            []
                          )
                        ),
                        b.objectProperty(b.identifier("name"), b.identifier("name")),
                        b.objectProperty(b.identifier("description"), b.identifier("description")),
                        b.objectProperty(
                          b.identifier("isActive"),
                          b.conditionalExpression(
                            b.binaryExpression(
                              "!==",
                              b.identifier("isActive"),
                              b.identifier("undefined")
                            ),
                            b.identifier("isActive"),
                            b.booleanLiteral(true)
                          )
                        )
                      ])
                    )
                  ]),
                  
                  // Example of using socket.io to emit an event if available
                  opts.websocketLib === "socketio" ? 
                    b.ifStatement(
                      b.identifier("io"),
                      b.blockStatement([
                        b.expressionStatement(
                          b.callExpression(
                            b.memberExpression(b.identifier("io"), b.identifier("emit")),
                            [
                              b.stringLiteral("example:created"),
                              b.identifier("newExample")
                            ]
                          )
                        )
                      ])
                    ) : b.emptyStatement(),
                  
                  // Return the response
                  b.expressionStatement(
                    b.callExpression(
                      b.memberExpression(
                        b.callExpression(
                          b.memberExpression(b.identifier("res"), b.identifier("status")),
                          [b.numericLiteral(201)]
                        ),
                        b.identifier("json")
                      ),
                      [b.identifier("newExample")]
                    )
                  )
                ]),
                b.catchClause(
                  b.identifier("error"),
                  null,
                  b.blockStatement([
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("console"), b.identifier("error")),
                        [b.stringLiteral("Error creating example:"), b.identifier("error")]
                      )
                    ),
                    b.expressionStatement(
                      b.callExpression(b.identifier("next"), [b.identifier("error")])
                    )
                  ])
                )
              )
            ])
          )
        )
      ])
    ),
    []
  );

  // Get the function expression from the return statement - need to cast to access the proper types
  const createFunctionDecl = createControllerFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  const createReturnStmt = createFunctionDecl.body.body[0] as recast.types.namedTypes.ReturnStatement;
  const createFunction = createReturnStmt.argument as recast.types.namedTypes.FunctionExpression;
  
  // Explicitly set async to true
  createFunction.async = true;

  // Add return type annotation
  createFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([b.tsVoidKeyword()])
    )
  );

  // Add JSDoc comment to the createController function
  createControllerFunction.comments = [
    b.commentBlock(COMMENTS.CONTROLLER.CREATE_CONTROLLER, true)
  ];

  // Create the updateController factory function
  const updateControllerFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("createUpdateController"),
      opts.websocketLib === "socketio" ? [createSocketParam()] : [],
      b.blockStatement([
        b.returnStatement(
          // Create function expression
          b.functionExpression(
            b.identifier("update"), // Named function expression
            createReqResNextParams(),
            b.blockStatement([
              b.tryStatement(
                b.blockStatement([
                  // Parse ID from request params
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.identifier("id"),
                      b.callExpression(
                        b.identifier("parseInt"),
                        [
                          b.memberExpression(
                            b.memberExpression(b.identifier("req"), b.identifier("params")),
                            b.identifier("id")
                          ),
                          b.numericLiteral(10)
                        ]
                      )
                    )
                  ]),
                  
                  // Destructure request body
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.objectPattern([
                        b.objectProperty(b.identifier("name"), b.identifier("name")),
                        b.objectProperty(b.identifier("description"), b.identifier("description")),
                        b.objectProperty(b.identifier("isActive"), b.identifier("isActive"))
                      ]),
                      b.memberExpression(b.identifier("req"), b.identifier("body"))
                    )
                  ]),
                  
                  // Example implementation - replace with actual data access
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.identifier("updatedExample"),
                      b.objectExpression([
                        b.objectProperty(b.identifier("id"), b.identifier("id")),
                        b.objectProperty(b.identifier("name"), b.identifier("name")),
                        b.objectProperty(b.identifier("description"), b.identifier("description")),
                        b.objectProperty(b.identifier("isActive"), b.identifier("isActive"))
                      ])
                    )
                  ]),
                  
                  // Example of using socket.io to emit an event if available
                  opts.websocketLib === "socketio" ? 
                    b.ifStatement(
                      b.identifier("io"),
                      b.blockStatement([
                        b.expressionStatement(
                          b.callExpression(
                            b.memberExpression(b.identifier("io"), b.identifier("emit")),
                            [
                              b.stringLiteral("example:updated"),
                              b.identifier("updatedExample")
                            ]
                          )
                        )
                      ])
                    ) : b.emptyStatement(),
                  
                  // Return the response
                  b.expressionStatement(
                    b.callExpression(
                      b.memberExpression(b.identifier("res"), b.identifier("json")),
                      [b.identifier("updatedExample")]
                    )
                  )
                ]),
                b.catchClause(
                  b.identifier("error"),
                  null,
                  b.blockStatement([
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("console"), b.identifier("error")),
                        [b.stringLiteral("Error updating example:"), b.identifier("error")]
                      )
                    ),
                    b.expressionStatement(
                      b.callExpression(b.identifier("next"), [b.identifier("error")])
                    )
                  ])
                )
              )
            ])
          )
        )
      ])
    ),
    []
  );

  // Get the function expression from the return statement - need to cast to access the proper types
  const updateFunctionDecl = updateControllerFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  const updateReturnStmt = updateFunctionDecl.body.body[0] as recast.types.namedTypes.ReturnStatement;
  const updateFunction = updateReturnStmt.argument as recast.types.namedTypes.FunctionExpression;
  
  // Explicitly set async to true
  updateFunction.async = true;

  // Add return type annotation
  updateFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([b.tsVoidKeyword()])
    )
  );

  // Add JSDoc comment to the updateController function
  updateControllerFunction.comments = [
    b.commentBlock(COMMENTS.CONTROLLER.UPDATE_CONTROLLER, true)
  ];

  // Create the deleteController factory function
  const deleteControllerFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("createDeleteController"),
      opts.websocketLib === "socketio" ? [createSocketParam()] : [],
      b.blockStatement([
        b.returnStatement(
          // Create function expression
          b.functionExpression(
            b.identifier("deleteExample"), // Named function expression
            createReqResNextParams(),
            b.blockStatement([
              b.tryStatement(
                b.blockStatement([
                  // Parse ID from request params
                  b.variableDeclaration("const", [
                    b.variableDeclarator(
                      b.identifier("id"),
                      b.callExpression(
                        b.identifier("parseInt"),
                        [
                          b.memberExpression(
                            b.memberExpression(b.identifier("req"), b.identifier("params")),
                            b.identifier("id")
                          ),
                          b.numericLiteral(10)
                        ]
                      )
                    )
                  ]),
                  
                  // Example of using socket.io to emit an event if available
                  opts.websocketLib === "socketio" ? 
                    b.ifStatement(
                      b.identifier("io"),
                      b.blockStatement([
                        b.expressionStatement(
                          b.callExpression(
                            b.memberExpression(b.identifier("io"), b.identifier("emit")),
                            [
                              b.stringLiteral("example:deleted"),
                              b.objectExpression([
                                b.objectProperty(b.identifier("id"), b.identifier("id"))
                              ])
                            ]
                          )
                        )
                      ])
                    ) : b.emptyStatement(),
                  
                  // Return the response
                  b.expressionStatement(
                    b.callExpression(
                      b.memberExpression(b.identifier("res"), b.identifier("json")),
                      [
                        b.objectExpression([
                          b.objectProperty(
                            b.identifier("message"),
                            b.templateLiteral(
                              [
                                b.templateElement({ raw: "Example ", cooked: "Example " }, false),
                                b.templateElement({ raw: " deleted successfully", cooked: " deleted successfully" }, true)
                              ],
                              [b.identifier("id")]
                            )
                          )
                        ])
                      ]
                    )
                  )
                ]),
                b.catchClause(
                  b.identifier("error"),
                  null,
                  b.blockStatement([
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("console"), b.identifier("error")),
                        [b.stringLiteral("Error deleting example:"), b.identifier("error")]
                      )
                    ),
                    b.expressionStatement(
                      b.callExpression(b.identifier("next"), [b.identifier("error")])
                    )
                  ])
                )
              )
            ])
          )
        )
      ])
    ),
    []
  );

  // Get the function expression from the return statement - need to cast to access the proper types
  const deleteFunctionDecl = deleteControllerFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  const deleteReturnStmt = deleteFunctionDecl.body.body[0] as recast.types.namedTypes.ReturnStatement;
  const deleteFunction = deleteReturnStmt.argument as recast.types.namedTypes.FunctionExpression;
  
  // Explicitly set async to true
  deleteFunction.async = true;

  // Add return type annotation
  deleteFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([b.tsVoidKeyword()])
    )
  );

  // Add JSDoc comment to the deleteController function
  deleteControllerFunction.comments = [
    b.commentBlock(COMMENTS.CONTROLLER.DELETE_CONTROLLER, true)
  ];

  // Build the AST program
  return b.program([
    ...controllerImports,
    exampleInterface,
    getAllControllerFunction,
    getByIdControllerFunction,
    createControllerFunction,
    updateControllerFunction,
    deleteControllerFunction
  ]);
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.print(ast, { parser: tsParser }).code;
} 