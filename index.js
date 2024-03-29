const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/userroute");


require("dotenv").config();
let app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome Mobilicis");
});
app.use("/", userRouter);


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db is connected");
  } catch (err) {
    console.log("db connection have error");
  }
  console.log(`server is running on port ${process.env.PORT}`);
});
