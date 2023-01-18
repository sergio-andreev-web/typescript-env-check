import { readFileSync } from 'node:fs';

type Rule = 'string' | 'number' | 'boolean';
type Schema = Record<string, Rule>;

export function parseEnv(text: string): Record<string, string> {
  const values: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const split = line.indexOf('=');
    if (split < 1) throw new Error(`Invalid env line: ${line}`);
    values[line.slice(0, split).trim()] = line.slice(split + 1).trim();
  }
  return values;
}

export function validate(schema: Schema, values: Record<string, string>): string[] {
  const errors: string[] = [];
  for (const [key, rule] of Object.entries(schema)) {
    const value = values[key];
    if (value === undefined || value === '') errors.push(`${key}: missing`);
    else if (rule === 'number' && !Number.isFinite(Number(value))) errors.push(`${key}: expected number`);
    else if (rule === 'boolean' && !['true', 'false'].includes(value)) errors.push(`${key}: expected boolean`);
  }
  return errors;
}

if (process.argv[1]?.endsWith('index.js')) {
  const [schemaPath, envPath] = process.argv.slice(2);
  if (!schemaPath || !envPath) throw new Error('Usage: node dist/index.js schema.json app.env');
  const errors = validate(JSON.parse(readFileSync(schemaPath, 'utf8')) as Schema, parseEnv(readFileSync(envPath, 'utf8')));
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Environment matches schema');
}
