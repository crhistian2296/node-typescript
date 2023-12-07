import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Take the base to return the determinate multiplication table',
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    demandOption: false,
    default: false,
    describe: 'Returns the multiplication table in console',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    demandOption: false,
    default: 10,
    describe: 'Returns many multiplication tables',
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) throw 'The base must be a number';
    if (argv.b < 1 || argv.l < 1) throw 'The base and limit must be positive and greater than 1';
    return true;
  })
  .parseSync();