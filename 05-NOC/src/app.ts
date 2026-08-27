import { envs } from "./config/plugins/envs.plugin.js";
import { MongoDatabase } from "./data/mongo/index.js";
(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  // await Server.start();
  // console.log("process.env.MAILER_EMAIL", envs.MAILER_EMAIL);
  // console.log("process.env.MAILER_PASSWORD", envs.MAILER_PASSWORD);
  // console.log("process.env.PORT", envs.PORT);
  // console.log("process.env.PROD", envs.PROD);
}
