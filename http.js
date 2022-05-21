const http = require("http");

const helloHandler = (req, res) => res.end("Hello world");

const server = http.createServer((req, res) => {
  const routePath = req.url;

  if (routePath === "/hello-world") {
    switch (req.method) {
      case "GET": {
        helloHandler(req, res);
        break;
      }

      case "POST": {
        res.end("Hello world post");
        break;
      }

      default: {
        res.end("Method not implemented");
      }
    }
  }
});

server.listen(3005, () => {
  console.log("HTTP SERVER RUNNING");
});
