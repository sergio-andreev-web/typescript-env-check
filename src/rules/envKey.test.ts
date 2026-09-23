import test from 'node:test';
import assert from 'node:assert/strict';
import { EnvKeyRule } from './envKey.js';

test('envKey accepts valid and rejects invalid values', () => {
  const rule = new EnvKeyRule();
  assert.equal(rule.validate("APP_PORT"), true);
  assert.equal(rule.validate("app-port"), false);
  assert.equal(rule.inspect("APP_PORT").valid, true);
  assert.throws(() => rule.assert("app-port"));
});

test('envKey options are immutable between instances', () => {
  const original = new EnvKeyRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("APP_PORT"), true);
  assert.equal(extended.validate("APP_PORT"), false);
});
