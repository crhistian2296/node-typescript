import fs from 'fs';
import { SaveFile } from './save-file.use-case';
describe('SaveFileUseCase', () => {
  afterEach(() => {
    // clean up

    if (fs.existsSync('outputs')) fs.rmSync('outputs', { recursive: true });
    if (fs.existsSync('custom-outputs')) fs.rmSync('custom-outputs', { recursive: true });
  });

  test('should save file with default values', () => {
    const saveFile = new SaveFile();
    const options = { fileContent: 'test-content' };

    const result = saveFile.execute(options);
    const filePath = 'outputs/table.txt';

    expect(result).toBe(true);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(fileExist).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('should save file witch dustom values', () => {
    const options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs',
      fileName: 'custom-table-name',
    };

    const saveFile = new SaveFile();

    const result = saveFile.execute(options);
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    expect(result).toBe(true);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(fileExist).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });
});
