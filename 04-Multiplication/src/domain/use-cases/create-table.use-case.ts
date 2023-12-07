import colors from 'colors';

const colorsDependency = colors;

interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  /**
   * DI - Dependency Injection
   */
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let table = '';
    for (let i = 1; i <= limit; i++) {
      table += `${base} ${`x`.blue} ${i} ${`=`.blue} ${i * base}\n`;
    }
    return table;
  }
}
