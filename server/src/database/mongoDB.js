import mongoose from "mongoose";
import 'dotenv/config';
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "KenroX",
    });
    console.log(
      `MongoDB Connected: ${connect.connection.host}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
export default connectDB;
