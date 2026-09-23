import test from 'node:test';
import assert from 'node:assert/strict';
import { EmailRule } from './email.js';

test('email accepts valid and rejects invalid values', () => {
  const rule = new EmailRule();
  assert.equal(rule.validate("user@example.com"), true);
  assert.equal(rule.validate("not-an-email"), false);
  assert.equal(rule.inspect("user@example.com").valid, true);
  assert.throws(() => rule.assert("not-an-email"));
});

test('email options are immutable between instances', () => {
  const original = new EmailRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("user@example.com"), true);
  assert.equal(extended.validate("user@example.com"), false);
});
