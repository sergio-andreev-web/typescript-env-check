import test from 'node:test';
import assert from 'node:assert/strict';
import { IsoTimeRule } from './isoTime.js';

test('isoTime accepts valid and rejects invalid values', () => {
  const rule = new IsoTimeRule();
  assert.equal(rule.validate("12:30:45"), true);
  assert.equal(rule.validate("12pm"), false);
  assert.equal(rule.inspect("12:30:45").valid, true);
  assert.throws(() => rule.assert("12pm"));
});

test('isoTime options are immutable between instances', () => {
  const original = new IsoTimeRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("12:30:45"), true);
  assert.equal(extended.validate("12:30:45"), false);
});
