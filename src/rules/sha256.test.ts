import test from 'node:test';
import assert from 'node:assert/strict';
import { Sha256Rule } from './sha256.js';

test('sha256 accepts valid and rejects invalid values', () => {
  const rule = new Sha256Rule();
  assert.equal(rule.validate("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"), true);
  assert.equal(rule.validate("sha256"), false);
  assert.equal(rule.inspect("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").valid, true);
  assert.throws(() => rule.assert("sha256"));
});

test('sha256 options are immutable between instances', () => {
  const original = new Sha256Rule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"), true);
  assert.equal(extended.validate("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"), false);
});
