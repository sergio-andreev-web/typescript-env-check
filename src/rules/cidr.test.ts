import test from 'node:test';
import assert from 'node:assert/strict';
import { CidrRule } from './cidr.js';

test('cidr accepts valid and rejects invalid values', () => {
  const rule = new CidrRule();
  assert.equal(rule.validate("192.0.2.0/24"), true);
  assert.equal(rule.validate("192.0.2.1"), false);
  assert.equal(rule.inspect("192.0.2.0/24").valid, true);
  assert.throws(() => rule.assert("192.0.2.1"));
});

test('cidr options are immutable between instances', () => {
  const original = new CidrRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("192.0.2.0/24"), true);
  assert.equal(extended.validate("192.0.2.0/24"), false);
});
