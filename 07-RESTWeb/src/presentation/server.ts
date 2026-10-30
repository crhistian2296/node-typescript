import express from "express";
import path from "path";
import { fileURLToPath } from "url";

export class Server {
  private readonly port;
  private readonly publicPath;
  private app = express();

  constructor(options: { port: number; publicPath: string }) {
    this.port = options.port;
    this.publicPath = options.publicPath;
  }

  async start() {
    //* Serve static files from the "public" directory
    this.app.use(express.static(this.publicPath));

    //* Trumpcard: Handle all other routes and serve the index.html file
    this.app.get("/{*splat}", (req, res) => {
      console.debug("base URL:", req.url);
      const rootPath = fileURLToPath(new URL("../../", import.meta.url));
      const indexPath = path.join(rootPath, this.publicPath, "index.html");

      res.sendFile(indexPath);
    });
    this.app.listen(this.port, () => {
      console.debug(`Server is running on port ${this.port}`);
    });
  }
}
