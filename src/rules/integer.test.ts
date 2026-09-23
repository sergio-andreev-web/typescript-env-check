import test from 'node:test';
import assert from 'node:assert/strict';
import { IntegerRule } from './integer.js';

test('integer accepts valid and rejects invalid values', () => {
  const rule = new IntegerRule();
  assert.equal(rule.validate("-42"), true);
  assert.equal(rule.validate("1.5"), false);
  assert.equal(rule.inspect("-42").valid, true);
  assert.throws(() => rule.assert("1.5"));
});

test('integer options are immutable between instances', () => {
  const original = new IntegerRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("-42"), true);
  assert.equal(extended.validate("-42"), false);
});
