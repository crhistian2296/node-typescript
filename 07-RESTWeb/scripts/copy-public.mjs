import { cpSync } from "node:fs";
import { fileURLToPath } from "node:url";

const publicPath = fileURLToPath(new URL("../public", import.meta.url));
const distPublicPath = fileURLToPath(
  new URL("../dist/public", import.meta.url),
);

cpSync(publicPath, distPublicPath, { recursive: true, force: true });
