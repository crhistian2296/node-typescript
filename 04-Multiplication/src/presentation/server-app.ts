import { CreateTable } from '../domain/use-cases/create-table.use-case';

interface RunOptions {
  base: number;
  show: boolean;
  limit: number;
}

export class ServerApp {
  static run({ base, show, limit }: RunOptions) {
    console.log('Server running...');
    // createTable(base, show, limit);
    const table = new CreateTable().execute({ base, limit });
  }
}
