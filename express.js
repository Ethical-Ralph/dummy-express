const http = require("http");

const parser = (req, cb) => {
  let body = "";

  req.on("data", (chunk) => {
    body += Buffer.from(chunk).toString();
  });

  req.on("end", () => {
    if (req.method != "GET") {
      cb(JSON.parse(body));
    } else {
      cb(body);
    }
  });
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
const handlers = {
  "/": {
    GET: [(req, res) => res.end("Dummy home")],
    POST: [(req, res) => res.end("Dummy home post")],
  },
};

module.exports = () => {
  const server = http.createServer((req, res) => {
    const handlerMethods = handlers[req.url];

    let pathHandlers;

    if (handlerMethods) {
      pathHandlers = handlerMethods[req.method.toUpperCase()];
    }

    const handler = pathHandlers ? pathHandlers.shift() : null;

    if (handler) {
      parser(req, (body) => {
        const _req = { body, ...req };
        const _res = response(res);

        const next = () => {
          if (pathHandlers.length > 0) {
            const nextHandler = pathHandlers.shift();
            nextHandler(_req, _res, next);
          }
        };

        // authMiddleware
        handler(_req, res, next);
      });
      return;
    }

    res.end(JSON.stringify({ message: "Not found" }));
  });

  return {
    get: (routePath, ...pathHandlers) => {
      const handleExist = handlers[routePath];

      if (handleExist) {
        handlers[routePath]["GET"] = pathHandlers;
        return;
      }

      handlers[routePath] = {};
      handlers[routePath]["GET"] = pathHandlers;

      return;
    },

    post: (routePath, ...pathHandlers) => {
      const handleExist = handlers[routePath];

      if (handleExist) {
        handlers[routePath]["POST"] = pathHandlers;
        return;
      }

      handlers[routePath] = {};
      handlers[routePath]["POST"] = pathHandlers;

      return;
    },

    listen: (port, cb) => {
      server.listen(port, cb);
    },
  };
};
