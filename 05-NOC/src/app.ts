import { envs } from "./config/plugins/envs.plugin.js";
import { MongoDatabase } from "./data/mongo/index.js";
import { Server } from "./presentation/server.js";
(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const prisma = db.orm.public;

  // const logs = await prisma.LogModel.create({
  //   level: "MEDIUM",
  //   message: "Test message desde Postgres",
  //   origin: "App.ts",
  // });

  // console.log("Logs:", logs);
  Server.start();

  // Crear una coleccion = tabla, documento = registro
  // const newLog = await LogModel.create({
  //   message: "Test message desde MongoDB",
  //   origin: "App.ts",
  //   level: "low",
  // });

  // await newLog.save();

  // console.log(newLog);
  // const logs = await LogModel.find();
  // console.log("logs", logs);

  // await Server.start();
  // console.log("process.env.MAILER_EMAIL", envs.MAILER_EMAIL);
  // console.log("process.env.MAILER_PASSWORD", envs.MAILER_PASSWORD);
  // console.log("process.env.PORT", envs.PORT);
  // console.log("process.env.PROD", envs.PROD);
}
