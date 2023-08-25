import express from "express";
import dontenv from "dotenv"
import { createServer } from "http"
import ApiError from "./src/utils/ApiError";
import httpStatus from "http-status";
import mongoose, { ConnectOptions } from "mongoose";
import router from "./src/routes/v1";

//configuring env
dontenv.config();
const PORT = process.env.PORT || 8080

//creating server
const app = express()
const server = createServer(app)

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router)
app.use("/api/v1/test", async (req, res) => {
    res.send(`Server is successfully up`);
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "URL Not found"));
});

//mongoose connection
mongoose
  .connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    //server starts after connection with MongoDB
    console.log("Connected to MongoDB");
    server.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`))
  })
  .catch((e: Error) => {
    console.log("MongoDB Connection Error");
    console.log(e);
  });

export default server