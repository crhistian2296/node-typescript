#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/16c9cc80ef404eb3a841e58a979ae04cc46a1be34c1920abe6d4d7d5d84c0eef/contract';
import startContract from '../../snapshots/16c9cc80ef404eb3a841e58a979ae04cc46a1be34c1920abe6d4d7d5d84c0eef/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f0632d2c8b15f66ddb879f6e645d2f498ab783943bd372dac5fd2963e8e2a0b9/contract';
import endContract from '../../snapshots/f0632d2c8b15f66ddb879f6e645d2f498ab783943bd372dac5fd2963e8e2a0b9/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
