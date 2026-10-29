import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs.readFileSync("public/index.html", "utf-8");

      res.end(html);
      return;
    } else if (req.url?.endsWith("/css/styles.css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    } else if (req.url?.endsWith("/js/app.js")) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
      return;
    }
    console.debug("url:", req.url);
    const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
    res.end(responseContent);
  },
);

server.listen(8080, () => {
  console.debug("server running on port 8080");
});
