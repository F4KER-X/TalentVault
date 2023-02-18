require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConnection");
const cookieParser = require('cookie-parser')
const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");
const bodyParser = require("body-parser");



const app = express();

const PORT = process.env.PORT;

//Middlewares
app.use(logger);
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongo connection
mongoose.set("strictQuery", false);
connectDB();

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use("/auth", require("./routes/authRoutes"));

app.use("/user", require("./routes/userRoutes"));

app.use("/jobs", require("./routes/jobRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 ERROR: Not Found" });
  } else {
    res.type("txt").send("404 ERROR: Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
