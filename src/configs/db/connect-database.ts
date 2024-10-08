import mongoose from "mongoose";

import { DB_URL } from "./db.config";

export async function connectDatabase() {
  try {
    await mongoose.connect(DB_URL);
    console.info("Connected database.");
  } catch (error) {
    console.info(error);
    console.error("Failed to connect database");
  }
}
