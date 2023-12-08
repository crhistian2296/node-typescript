import { yarg } from './config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
  await main();
  console.log('Fin de ejcucion');
})();

async function main() {
  const { b: base, s: show, l: limit, n: fileName, d: fileDestination } = yarg;
  // createTable(base, show, limit).then(console.log).catch(console.log);
  ServerApp.run({ base, show, limit, fileName, fileDestination });
}
