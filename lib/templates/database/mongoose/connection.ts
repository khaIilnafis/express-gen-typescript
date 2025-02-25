// @ts-nocheck - Template file, not meant to be validated directly
import mongoose from "mongoose";

// MongoDB URI from environment variables
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/{{databaseName}}";

/**
 * Initialize MongoDB connection
 */
export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connection has been established successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

/**
 * Close MongoDB connection
 */
export async function closeDatabaseConnection(): Promise<void> {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
}

// Export mongoose instance
export default mongoose;
