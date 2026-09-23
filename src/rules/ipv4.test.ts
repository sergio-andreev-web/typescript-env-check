import test from 'node:test';
import assert from 'node:assert/strict';
import { Ipv4Rule } from './ipv4.js';

test('ipv4 accepts valid and rejects invalid values', () => {
  const rule = new Ipv4Rule();
  assert.equal(rule.validate("192.0.2.1"), true);
  assert.equal(rule.validate("host.local"), false);
  assert.equal(rule.inspect("192.0.2.1").valid, true);
  assert.throws(() => rule.assert("host.local"));
});

test('ipv4 options are immutable between instances', () => {
  const original = new Ipv4Rule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("192.0.2.1"), true);
  assert.equal(extended.validate("192.0.2.1"), false);
});
