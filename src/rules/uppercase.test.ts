import test from 'node:test';
import assert from 'node:assert/strict';
import { UppercaseRule } from './uppercase.js';

test('uppercase accepts valid and rejects invalid values', () => {
  const rule = new UppercaseRule();
  assert.equal(rule.validate("UPPERCASE"), true);
  assert.equal(rule.validate("Lower"), false);
  assert.equal(rule.inspect("UPPERCASE").valid, true);
  assert.throws(() => rule.assert("Lower"));
});

test('uppercase options are immutable between instances', () => {
  const original = new UppercaseRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("UPPERCASE"), true);
  assert.equal(extended.validate("UPPERCASE"), false);
});
