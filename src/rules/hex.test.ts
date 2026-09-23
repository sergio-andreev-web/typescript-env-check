import test from 'node:test';
import assert from 'node:assert/strict';
import { HexRule } from './hex.js';

test('hex accepts valid and rejects invalid values', () => {
  const rule = new HexRule();
  assert.equal(rule.validate("deadbeef"), true);
  assert.equal(rule.validate("not-hex"), false);
  assert.equal(rule.inspect("deadbeef").valid, true);
  assert.throws(() => rule.assert("not-hex"));
});

test('hex options are immutable between instances', () => {
  const original = new HexRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("deadbeef"), true);
  assert.equal(extended.validate("deadbeef"), false);
});
