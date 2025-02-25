// @ts-nocheck - Template file, not meant to be validated directly
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/sequelize";

/**
 * Example model attributes interface
 */
export interface ExampleAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Example creation attributes interface (for when creating a new example)
 */
export interface ExampleCreationAttributes
  extends Optional<ExampleAttributes, "id"> {}

/**
 * Example model definition
 */
class Example
  extends Model<ExampleAttributes, ExampleCreationAttributes>
  implements ExampleAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public priority!: number;
  public isActive!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Example.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "examples",
  }
);

export default Example;
