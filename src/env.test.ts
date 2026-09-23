import test from 'node:test';
import assert from 'node:assert/strict';
import { parseEnv } from './env.js';
import { validate } from './schema.js';

test('parses quoted and exported values', () => {
  assert.deepEqual(parseEnv('export PORT=3000\nNAME="Hello world"\nDEBUG=true # comment\n'), {
    PORT: '3000', NAME: 'Hello world', DEBUG: 'true',
  });
});

test('reports duplicate and invalid lines', () => {
  assert.throws(() => parseEnv('A=1\nA=2'), /duplicate key/);
  assert.throws(() => parseEnv('broken'), /expected KEY=value/);
});

test('validates types, defaults, bounds and unknown keys', () => {
  const schema = {
    PORT: { type: 'number' as const, min: 1, max: 65535 },
    DEBUG: 'boolean' as const,
    NAME: { type: 'string' as const, default: 'app', pattern: '^[a-z]+$' },
  };
  assert.deepEqual(validate(schema, { PORT: '3000', DEBUG: 'false' }).errors, []);
  assert.equal(validate(schema, { PORT: '0', DEBUG: 'maybe' }).errors.length, 2);
  assert.equal(validate(schema, { PORT: '3000', DEBUG: 'true', EXTRA: 'x' }, true).errors.length, 1);
});
