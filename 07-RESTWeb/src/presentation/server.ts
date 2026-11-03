import express, { type Express, type Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

export class Server {
  private readonly port;
  private readonly publicPath;
  private readonly routes: Router;
  private app: Express = express();

  constructor(options: { port: number; publicPath: string; routes: Router }) {
    this.port = options.port;
    this.publicPath = options.publicPath;
    this.routes = options.routes;
  }

  async start() {
    // * Middleware to parse JSON bodies
    this.app.use(express.json()); // application/json
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Serve static files from the "public" directory
    this.app.use(express.static(this.publicPath));

    // * Routes
    this.app.use(this.routes);

    // * Trumpcard: Handle all other routes and serve the index.html file
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
