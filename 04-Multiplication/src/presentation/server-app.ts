import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
  base: number;
  show: boolean;
  limit: number;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {
  static run({ base, show, limit, fileName, fileDestination }: RunOptions) {
    console.log('Server running...');
    
    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({
      fileContent: table.stripColors,
      fileDestination,
      fileName,
    });

    if (show) console.log(table);
    wasCreated ? console.log('File created!!:', fileName) : console.log('File not created!!');
  }
}
