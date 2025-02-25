// @ts-nocheck - Template file, not meant to be validated directly
import mongoose, { Document, Schema } from "mongoose";

/**
 * Interface for Example document
 */
export interface IExample extends Document {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Example Schema
 */
const ExampleSchema = new Schema<IExample>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Example = mongoose.model<IExample>("Example", ExampleSchema);
