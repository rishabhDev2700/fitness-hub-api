import { connect, ConnectOptions } from "mongoose";

const MONGO_URL = process.env.MONGO_URL;
export function connectDatabase() {
  connect(MONGO_URL || "")
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.error(err);
    });
}
