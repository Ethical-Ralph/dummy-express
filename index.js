const express = require("./express");

const app = express();

app.get("/hello-world", (req, res) => {
  res.send("hello world");
});

app.get("/home", (req, res) => {
  res.send("home");
});

// const authMiddleware = (req, res, next) => {
//   if (!req.user) {
//     return res.end("No user authenicated");
//   }
//   next();
// };

app.post("/json", (req, res) => {
  res.json({
    message: req.body,
  });
});

app.listen(9000, () => {
  console.log("app listening on: ", 9000);
});
