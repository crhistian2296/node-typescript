import { envs } from "./config/envs.js";
import { Server } from "./presentation/server.js";

(() => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
  });

  server.start();
}
