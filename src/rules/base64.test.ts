import test from 'node:test';
import assert from 'node:assert/strict';
import { Base64Rule } from './base64.js';

test('base64 accepts valid and rejects invalid values', () => {
  const rule = new Base64Rule();
  assert.equal(rule.validate("SGVsbG8="), true);
  assert.equal(rule.validate("invalid?"), false);
  assert.equal(rule.inspect("SGVsbG8=").valid, true);
  assert.throws(() => rule.assert("invalid?"));
});

test('base64 options are immutable between instances', () => {
  const original = new Base64Rule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("SGVsbG8="), true);
  assert.equal(extended.validate("SGVsbG8="), false);
});
