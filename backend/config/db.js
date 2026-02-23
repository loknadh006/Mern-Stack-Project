// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Exporting an async function named connectDB to connect to MongoDB
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI stored in the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, log the connected host (e.g., cluster0.mongodb.net)
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // If there is an error connecting to MongoDB, print the error message
    console.error(`Error: ${error.message}`);

    // Exit the process with failure (exit code 1)
    process.exit(1);
  }
};
