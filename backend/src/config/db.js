const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true); // avoid deprecated warnings
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Useful for test teardown or graceful shutdown
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Failed to disconnect MongoDB:", error.message);
  }
};

module.exports = { connectDB, disconnectDB };
