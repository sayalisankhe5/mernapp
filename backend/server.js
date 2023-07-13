require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/dBConn");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

app.use(logger);
connectDB();
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "NotFound.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "Sorry, Not found" });
  } else {
    res.type("txt").send("Not found ");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`server is listening to ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.errno}\t${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoDBLog.log"
  );
});
