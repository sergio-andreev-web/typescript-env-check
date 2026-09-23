import test from 'node:test';
import assert from 'node:assert/strict';
import { LowercaseRule } from './lowercase.js';

test('lowercase accepts valid and rejects invalid values', () => {
  const rule = new LowercaseRule();
  assert.equal(rule.validate("lowercase"), true);
  assert.equal(rule.validate("Upper"), false);
  assert.equal(rule.inspect("lowercase").valid, true);
  assert.throws(() => rule.assert("Upper"));
});

test('lowercase options are immutable between instances', () => {
  const original = new LowercaseRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("lowercase"), true);
  assert.equal(extended.validate("lowercase"), false);
});
