// import mongoose from "mongoose";
// import { env } from "./env.js";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(env.MONGO_URI);

//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";
import dns from "dns";
import { env } from "./env.js";

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  try {
    console.log("Connecting with:", env.MONGO_URI);

    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;