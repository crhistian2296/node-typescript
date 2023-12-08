import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export let yarg = yargs(hideBin(process.argv))
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
  .option('n', {
    alias: 'name',
    type: 'string',
    demandOption: false,
    default: '',
    describe: 'Give a name to the returned table',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    demandOption: false,
    default: 'outputs',
    describe: 'File destination',
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) throw 'The base must be a number';
    if (argv.b < 1 || argv.l < 1) throw 'The base and limit must be positive and greater than 1';
    return true;
  })
  .parseSync();

  if (!yarg.name) {
    yarg.name = `table-${yarg.b}`;
    yarg.n = `table-${yarg.b}`;
  }