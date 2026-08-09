import { Server } from "./presentation/server.js";
(async () => {
  await main();
})();

async function main() {
  await Server.start();
  // console.log("process.env.MAILER_EMAIL", envs.MAILER_EMAIL);
  // console.log("process.env.MAILER_PASSWORD", envs.MAILER_PASSWORD);
  // console.log("process.env.PORT", envs.PORT);
  // console.log("process.env.PROD", envs.PROD);
}
