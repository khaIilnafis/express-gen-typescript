import * as recast from "recast";

/**
 * IR Definitions
 */
export interface ParameterIR {
  name: string;
  type?: string; // e.g. "string", "number", etc.
  isOptional?: boolean; // flag to denote optional parameters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any; // can be used to later attach default value handling
}

export interface FunctionIR {
  name: string;
  parameters: ParameterIR[];
  returnType?: string;
  // For simplicity, we assume that body is provided as recast AST nodes.
  // In a complete solution you might define a more abstract StatementIR.
  body: recast.types.namedTypes.Statement[];
}

export interface MethodIR {
  name: string;
  identifier: recast.types.namedTypes.Identifier | null | undefined;
  params: Array<recast.types.namedTypes.TSTypeParameter>;
  body: recast.types.namedTypes.BlockStatement;
  generator?: boolean;
  expression?: boolean;
  comment?: {
    value: string;
    trailing: boolean;
  };
}
