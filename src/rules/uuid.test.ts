import test from 'node:test';
import assert from 'node:assert/strict';
import { UuidRule } from './uuid.js';

test('uuid accepts valid and rejects invalid values', () => {
  const rule = new UuidRule();
  assert.equal(rule.validate("123e4567-e89b-12d3-a456-426614174000"), true);
  assert.equal(rule.validate("1234"), false);
  assert.equal(rule.inspect("123e4567-e89b-12d3-a456-426614174000").valid, true);
  assert.throws(() => rule.assert("1234"));
});

test('uuid options are immutable between instances', () => {
  const original = new UuidRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("123e4567-e89b-12d3-a456-426614174000"), true);
  assert.equal(extended.validate("123e4567-e89b-12d3-a456-426614174000"), false);
});
