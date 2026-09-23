import test from 'node:test';
import assert from 'node:assert/strict';
import { AlphaRule } from './alpha.js';

test('alpha accepts valid and rejects invalid values', () => {
  const rule = new AlphaRule();
  assert.equal(rule.validate("Alphabet"), true);
  assert.equal(rule.validate("abc123"), false);
  assert.equal(rule.inspect("Alphabet").valid, true);
  assert.throws(() => rule.assert("abc123"));
});

test('alpha options are immutable between instances', () => {
  const original = new AlphaRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("Alphabet"), true);
  assert.equal(extended.validate("Alphabet"), false);
});
