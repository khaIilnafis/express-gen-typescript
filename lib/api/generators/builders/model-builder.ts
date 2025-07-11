/**
 * Model builder - generates model code from specifications
 */

import type { ModelSpec } from "../../../schemas/index.js";
import type { GenerationContext } from "../../types.js";

export async function buildModel(
  spec: ModelSpec,
  _context: GenerationContext,
): Promise<string> {
  // TODO: Implement proper AST-based model generation
  // For now, generate basic model structure based on ORM

  switch (spec.orm) {
    case "sequelize":
      return buildSequelizeModel(spec);
    case "typeorm":
      return buildTypeORMModel(spec);
    case "prisma":
      return buildPrismaModel(spec);
    case "mongoose":
      return buildMongooseModel(spec);
    default:
      throw new Error(`Unsupported ORM: ${spec.orm}`);
  }
}

function buildSequelizeModel(spec: ModelSpec): string {
  const fields = spec.fields
    .map(
      (field) => `
  ${field.name}: {
    type: DataTypes.${field.type.toUpperCase()},
    allowNull: ${!field.required},
    primaryKey: ${field.primaryKey},
    autoIncrement: ${field.autoIncrement},
  },`,
    )
    .join("");

  return `import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ${spec.name}Attributes {${spec.fields
    .map(
      (f) => `
  ${f.name}: ${f.type};`,
    )
    .join("")}
}

interface ${spec.name}CreationAttributes extends Optional<${spec.name}Attributes, 'id'> {}

export class ${spec.name} extends Model<${spec.name}Attributes, ${spec.name}CreationAttributes> 
  implements ${spec.name}Attributes {${spec.fields
    .map(
      (f) => `
  public ${f.name}!: ${f.type};`,
    )
    .join("")}
}

${spec.name}.init({${fields}
}, {
  sequelize,
  modelName: '${spec.name}',
  tableName: '${spec.tableName || spec.name.toLowerCase()}',
  timestamps: ${spec.timestamps},
});`;
}

function buildTypeORMModel(spec: ModelSpec): string {
  const fields = spec.fields
    .map(
      (field) => `
  @Column({
    type: '${field.type}',
    nullable: ${!field.required},
    primary: ${field.primaryKey},
  })
  ${field.name}!: ${field.type};`,
    )
    .join("");

  return `import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('${spec.tableName || spec.name.toLowerCase()}')
export class ${spec.name} {
  @PrimaryGeneratedColumn()
  id!: number;${fields}
}`;
}

function buildPrismaModel(spec: ModelSpec): string {
  const fields = spec.fields
    .map(
      (field) => `
  ${field.name} ${field.type}${field.required ? "" : "?"}${field.primaryKey ? " @id" : ""}${field.autoIncrement ? " @default(autoincrement())" : ""}`,
    )
    .join("");

  return `model ${spec.name} {${fields}
}`;
}

function buildMongooseModel(spec: ModelSpec): string {
  const fields = spec.fields
    .map(
      (field) => `
  ${field.name}: {
    type: ${field.type},
    required: ${field.required},
  },`,
    )
    .join("");

  return `import { Schema, model, Document } from 'mongoose';

interface I${spec.name} extends Document {${spec.fields
    .map(
      (f) => `
  ${f.name}: ${f.type};`,
    )
    .join("")}
}

const ${spec.name}Schema = new Schema({${fields}
}, {
  timestamps: ${spec.timestamps},
});

export const ${spec.name} = model<I${spec.name}>('${spec.name}', ${spec.name}Schema);`;
}
