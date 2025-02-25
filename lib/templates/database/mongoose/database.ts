// @ts-nocheck - Template file, not meant to be validated directly
import mongoose from "mongoose";

// Connection URI
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/{{databaseName}}";
// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Close the Mongoose connection when the application terminates
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed due to application termination");
    process.exit(0);
  } catch (err) {
    console.error("Error closing Mongoose connection:", err);
    process.exit(1);
  }
});

/**
 * Initialize Mongoose connection
 * @returns Mongoose connection
 */
export async function initializeDatabase(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(mongoUri, options);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default mongoose;
