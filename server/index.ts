import mongoose from "mongoose";

interface Mongoconfig {
  mongoUrl: string;
}
const config: Mongoconfig = useRuntimeConfig();

export default async () => {
  try {
    console.log(config.mongoUrl);
    await mongoose.connect(config.mongoUrl);
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};
