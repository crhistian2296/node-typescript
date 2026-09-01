import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";
import "dotenv/config";
import { envs } from "./src/config/plugins/envs.plugin";

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: envs.POSTGRES_URL,
    },
  }),
});
