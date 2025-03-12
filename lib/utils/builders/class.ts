import * as recast from "recast";
import { ClassPropertyBuilderFn } from "../../types/index.js";

const b = recast.types.builders;

export const buildClassProperties: ClassPropertyBuilderFn = (
  _options,
  cfg,
): recast.types.namedTypes.ClassProperty[] => {
  const classProperties: recast.types.namedTypes.ClassProperty[] = [];
  for (const method of Object.keys(cfg)) {
    const methodProperty = b.classProperty(
      b.identifier(cfg[method].METHOD),
      null,
    ) as recast.types.namedTypes.ClassProperty;

    methodProperty.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(
        b.identifier("ReturnType"),
        b.tsTypeParameterInstantiation([
          b.tsTypeQuery(b.identifier(cfg[method].CALLER)),
        ]),
      ),
    );
    classProperties.push(methodProperty);
  }
  return classProperties;
};
