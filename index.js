const express = require("./express");

const app = express();

app.get("/hello-world", (req, res) => {
  res.send("hello world");
});

app.get("/home", (req, res) => {
  res.send("home");
});

app.get("/json", (req, res) => {
  res.json({
    message: "JSON DATA",
  });
});

app.listen(9000, () => {
  console.log("app listening on: ", 9000);
});
