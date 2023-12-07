import colors from 'colors';
import fs from 'fs';

const colorOptions = colors;

export const createTable = async (base: number, showTable: boolean, limit: number) => {
  try {
    let table = `${`=======================`.rainbow}
      TABLA DEL: ${`${base}`.green}
${`=======================`.rainbow}\n`;

    for (let i = 1; i <= limit; i++) {
      table += `${base} ${`x`.blue} ${i} ${`=`.blue} ${i * base}\n`;
    }

    if (showTable) console.log(table);

    const outputPath = 'outputs';

    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, table.stripColors);

    return `tabla-${base}.txt creada`.magenta;
  } catch (err: any) {
    throw err.red;
  }
};
