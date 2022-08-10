import mongoose from "mongoose";
const dotenv = require("dotenv");

dotenv.config();

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI);

export default connectMongo;
