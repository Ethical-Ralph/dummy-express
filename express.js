const http = require("http");

const handlers = {
  "/": {
    GET: (req, res) => res.end("Dummy home"),
    POST: (req, res) => res.end("Dummy home post"),
  },
};

const response = (res) => ({
  send: (data) => res.end(data),
  json: (data, statusCode) => {
    res.writeHead(statusCode ? statusCode : 200, {
      "Content-Type": "application/json",
    });
    const string = JSON.stringify(data);

    res.end(string);
  },
});

// dummy express module
module.exports = () => {
  const server = http.createServer((req, res) => {
    const handlerMethods = handlers[req.url];

    let handler;

    if (handlerMethods) {
      handler = handlerMethods[req.method.toUpperCase()];
    }

    if (handler) {
      handler(req, response(res));
      return;
    }

    res.end(JSON.stringify({ message: "Not found" }));
  });

  return {
    get: (routePath, handler) => {
      const handleExist = handlers[routePath];

      if (handleExist) {
        handlers[routePath]["GET"] = handler;
        return;
      }

      handlers[routePath] = {};
      handlers[routePath]["GET"] = handler;

      return;
    },

    listen: (port, cb) => {
      server.listen(port, cb);
    },
  };
};
