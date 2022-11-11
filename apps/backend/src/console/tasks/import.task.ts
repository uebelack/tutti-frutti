import { Console, Command } from 'nestjs-console';

@Console()
export class ImportTask {
  @Command({
    command: 'import',
    description: 'import categories and words from googlesheet',
  })
  async import(): Promise<void> {
    console.log('Hoi');
  }
}
