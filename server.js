import express from "express";
import mongoose from "mongoose";
import path from "path";
import config from "config";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", index.html));
  });
}

const mongoDbUrl = config.get("mongoDbUrl");
const PORT = process.env.PORT || 4000;

console.log("Database Url --- " + mongoDbUrl);
// connecting to database
mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((value) => {
    console.log("Connecting to database -- " + (value ? "Connected" : ""));
    app.listen(PORT);
  })
  .catch((error) => console.log("Error connecting to database -- " + error));
