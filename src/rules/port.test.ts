import test from 'node:test';
import assert from 'node:assert/strict';
import { PortRule } from './port.js';

test('port accepts valid and rejects invalid values', () => {
  const rule = new PortRule();
  assert.equal(rule.validate("8080"), true);
  assert.equal(rule.validate("port"), false);
  assert.equal(rule.inspect("8080").valid, true);
  assert.throws(() => rule.assert("port"));
});

test('port options are immutable between instances', () => {
  const original = new PortRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("8080"), true);
  assert.equal(extended.validate("8080"), false);
});
