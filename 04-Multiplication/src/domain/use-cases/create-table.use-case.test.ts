import { CreateTable } from './create-table.use-case';
describe('CreateTableUseCase', () => {
  const titleRows = 4;

  test('should create a table with default values', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2 }).stripColors;
    const rows = table.split('\n').length;

    const tableContent = 10;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(rows).toBe(titleRows + tableContent);
    expect(table).toContain('2 x 10 = 20');
  });

  test('should create a table with custom values', () => {
    const options = {
      base: 3,
      limit: 20,
    };

    const createTable = new CreateTable();
    const table = createTable.execute(options).stripColors;
    const rows = table.split('\n').length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('3 x 10 = 30');
    expect(table).toContain('3 x 20 = 60');
    expect(rows).toBe(titleRows + options.limit);
  });
});
