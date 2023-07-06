const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");
const { logger } = require("./middleware/logger");

app.use(logger);

app.use(express.json());

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

app.listen(PORT, () => console.log(`server is listening to ${PORT}`));
