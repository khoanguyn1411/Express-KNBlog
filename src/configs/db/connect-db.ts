import { MongoClient } from "mongodb";

import { DB_URL } from "./db.config";

export async function connectDb() {
  const client = new MongoClient(DB_URL);
  try {
    await client.connect();
    console.log("Connect to database successfully.");
  } catch (error) {
    console.error("Failed to connect database");
    console.log(error);
  }
}
