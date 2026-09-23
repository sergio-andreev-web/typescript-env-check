import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parseEnv } from './env.js';
import { validate, type Schema } from './schema.js';

function main(args: string[]): number {
  const json = args.includes('--json');
  const strict = args.includes('--strict');
  const paths = args.filter(arg => !arg.startsWith('--'));
  if (paths.length !== 2) {
    console.error('Usage: env-check <schema.json> <file.env> [--strict] [--json]');
    return 2;
  }
  try {
    const schema = JSON.parse(readFileSync(paths[0], 'utf8')) as Schema;
    const values = parseEnv(readFileSync(paths[1], 'utf8'));
    const result = validate(schema, values, strict);
    if (json) console.log(JSON.stringify({ valid: result.errors.length === 0, errors: result.errors }, null, 2));
    else if (result.errors.length) console.error(result.errors.join('\n'));
    else console.log('Environment matches schema');
    return result.errors.length ? 1 : 0;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}

export { main };
