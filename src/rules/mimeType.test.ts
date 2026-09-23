import test from 'node:test';
import assert from 'node:assert/strict';
import { MimeTypeRule } from './mimeType.js';

test('mimeType accepts valid and rejects invalid values', () => {
  const rule = new MimeTypeRule();
  assert.equal(rule.validate("application/json"), true);
  assert.equal(rule.validate("json"), false);
  assert.equal(rule.inspect("application/json").valid, true);
  assert.throws(() => rule.assert("json"));
});

test('mimeType options are immutable between instances', () => {
  const original = new MimeTypeRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("application/json"), true);
  assert.equal(extended.validate("application/json"), false);
});
