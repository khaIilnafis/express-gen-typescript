import * as recast from "recast";
import { PropertyIR } from "../../types/config.js";
import { PropertiesBuilderFn, PropertyBuilderFn } from "../../types/index.js";

const b = recast.types.builders;

export const buildProperty: PropertyBuilderFn = (
  propertyDef: PropertyIR,
): recast.types.namedTypes.ClassProperty => {
  // Create the basic property with its identifier
  const property = b.classProperty(
    b.identifier(propertyDef.key),
    //@ts-expect-error recast type issues
    propertyDef.value ? buildPropertyValue(propertyDef.value) : null,
  ) as recast.types.namedTypes.ClassProperty;

  // Set access modifiers if specified
  if (propertyDef.accessModifier) {
    //@ts-expect-error recast type issues
    property.accessibility = propertyDef.accessModifier;
  }

  // Set optional property flag if needed
  if (propertyDef.isOptional) {
    //@ts-expect-error recast type issues
    property.optional = true;
  }

  // Set readonly flag if needed
  if (propertyDef.isReadonly) {
    //@ts-expect-error recast type issues
    property.readonly = true;
  }

  // Set static flag if needed
  if (propertyDef.isStatic) {
    property.static = true;
  }

  // Set definite assignment if needed (for properties like: prop!: Type)
  if (propertyDef.hasDefiniteAssignment) {
    //@ts-expect-error recast type issues
    property.definite = true;
  }

  // Add type annotation if provided
  if (propertyDef.type) {
    property.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier(propertyDef.type)),
    );
  } else if (propertyDef.complexType) {
    // Handle complex types like ReturnType<typeof functionName>
    const { wrapper, inner } = propertyDef.complexType;

    let innerType;
    if (inner.type === "typeof") {
      innerType = b.tsTypeQuery(b.identifier(inner.value));
    } else {
      innerType = b.tsTypeReference(
        b.identifier(inner.value),
        inner.typeParameters
          ? b.tsTypeParameterInstantiation(
              inner.typeParameters.map((param) =>
                b.tsTypeReference(b.identifier(param)),
              ),
            )
          : undefined,
      );
    }

    property.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(
        b.identifier(wrapper),
        b.tsTypeParameterInstantiation([innerType]),
      ),
    );
  }

  // Add JSDoc comment if provided
  if (propertyDef.comment) {
    // This would need to be implemented based on how recast handles comments
    // property.comments = ...
  }

  return property;
};

// Helper function to build property values
function buildPropertyValue(
  value: PropertyIR["value"],
): recast.types.namedTypes.Expression {
  if (value === null) {
    return b.literal(null);
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return b.literal(value);
  }

  if (typeof value === "object") {
    // Handle complex values
    switch (value.type) {
      case "identifier":
        return b.identifier(value.value as string);

      case "function_call":
        return b.callExpression(
          b.identifier(value.value as string),
          //@ts-expect-error recast type issues
          (value.arguments || []).map((arg) => buildMethodArgument(arg)),
        );

      case "property_access":
        return b.memberExpression(
          b.identifier(value.target as string),
          b.identifier(value.property as string),
        );

      case "object":
        return b.objectExpression(
          Object.entries(value.properties || {}).map(([key, val]) =>
            //@ts-expect-error recast type issues
            b.property("init", b.identifier(key), buildMethodArgument(val)),
          ),
        );

      default:
        return b.literal(null);
    }
  }

  return b.literal(null);
}

// Utility function to build multiple properties at once
export const buildProperties: PropertiesBuilderFn = (
  propertiesDef,
): recast.types.namedTypes.ClassProperty[] => {
  return Object.keys(propertiesDef).map((propIR) =>
    buildProperty(propertiesDef[propIR]),
  );
};
