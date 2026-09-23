import test from 'node:test';
import assert from 'node:assert/strict';
import { HexColorRule } from './hexColor.js';

test('hexColor accepts valid and rejects invalid values', () => {
  const rule = new HexColorRule();
  assert.equal(rule.validate("#aabbcc"), true);
  assert.equal(rule.validate("blue"), false);
  assert.equal(rule.inspect("#aabbcc").valid, true);
  assert.throws(() => rule.assert("blue"));
});

test('hexColor options are immutable between instances', () => {
  const original = new HexColorRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("#aabbcc"), true);
  assert.equal(extended.validate("#aabbcc"), false);
});
