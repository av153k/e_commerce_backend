import express from "express";
import mongoose from "mongoose";
import path from "path";
import config from "config";
import { authRouter } from "./routes/authRoutes";
import { cartRouter } from "./routes/cartRoutes";
import { orderRouter } from "./routes/orderRoutes";
import { productRouter } from "./routes/productRoutes";

const app = express();
app.use(express.json());

app.use("/api", authRouter);
app.use("/api", cartRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

console.log("Added routes");

if (process.env.NODE_ENV == "prod") {
  app.use(express.static("client/build"));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", index.html));
  // });
}

const mongoDbUrl: string = config.get("mongoDbUrl");
const HOST: string = "0.0.0.0";
const PORT: number = 8080;

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
    app.listen(PORT, HOST, () => {
      console.log(
        "E-commerce backend server started at -- http://" + HOST + ":" + PORT
      );
    });
  })
  .catch((error) => console.log("Error connecting to database -" + error));
