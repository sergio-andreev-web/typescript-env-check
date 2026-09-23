import test from 'node:test';
import assert from 'node:assert/strict';
import { HttpMethodRule } from './httpMethod.js';

test('httpMethod accepts valid and rejects invalid values', () => {
  const rule = new HttpMethodRule();
  assert.equal(rule.validate("POST"), true);
  assert.equal(rule.validate("FETCH"), false);
  assert.equal(rule.inspect("POST").valid, true);
  assert.throws(() => rule.assert("FETCH"));
});

test('httpMethod options are immutable between instances', () => {
  const original = new HttpMethodRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("POST"), true);
  assert.equal(extended.validate("POST"), false);
});
