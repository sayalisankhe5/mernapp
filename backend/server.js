const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

app.use(logger);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

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

app.listen(PORT, () => console.log(`server is listening to ${PORT}`));
