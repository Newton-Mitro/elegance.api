import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

export class TemplateEngine {
  static render(templateName: string, data: Record<string, any>): string {
    const templatePath = path.resolve(
      __dirname,
      'templates',
      `${templateName}.hbs`,
    );
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiled = handlebars.compile(templateContent);
    return compiled(data);
  }
}
