import test from 'node:test';
import assert from 'node:assert/strict';
import { TimezoneRule } from './timezone.js';

test('timezone accepts valid and rejects invalid values', () => {
  const rule = new TimezoneRule();
  assert.equal(rule.validate("Europe/Moscow"), true);
  assert.equal(rule.validate("UTC+3"), false);
  assert.equal(rule.inspect("Europe/Moscow").valid, true);
  assert.throws(() => rule.assert("UTC+3"));
});

test('timezone options are immutable between instances', () => {
  const original = new TimezoneRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("Europe/Moscow"), true);
  assert.equal(extended.validate("Europe/Moscow"), false);
});
