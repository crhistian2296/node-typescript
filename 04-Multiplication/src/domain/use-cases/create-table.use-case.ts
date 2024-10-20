import colors from 'colors';

const colorsDependency = colors;

interface CreateTableUseCase {
  execute: (options: Options) => string;
}

interface Options {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  /**
   * DI - Dependency Injection
   */
  constructor() {}

  execute({ base, limit = 10 }: Options) {
    let table = `${`========================`.rainbow}
      TABLA DEL: ${`${base}`.green}
${`========================`.rainbow}\n\n`;

    for (let i = 1; i <= limit; i++) {
      table += `${base} ${`x`.blue} ${i} ${`=`.blue} ${i * base}`;
      if (i < limit) table += '\n';
    }
    return table;
  }
}
