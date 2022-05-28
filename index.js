const express = require("./express");

const app = express();

app.get("/hello-world", (req, res) => {
  res.send("hello world");
});

app.get("/home", (req, res) => {
  res.send("home");
});

const authMiddleware = (req, res, next) => {
  console.log("from auth middleware");
  next();
};

const dummyMiddleware = (req, res, next) => {
  console.log("from dummyMiddleware ");
  next();
};

const loggerMiddleware = (req, res, next) => {
  console.log("from loggerMiddleware");
  req.log = {
    massage: "Logger",
  };
  next();
};

const mainHandler = (req, res, next) => {
  res.json({
    message: req.body,
  });
};

app.get(
  "/json",
  authMiddleware,
  dummyMiddleware,
  loggerMiddleware,
  mainHandler
);

app.listen(9000, () => {
  console.log("app listening on: ", 9000);
});
