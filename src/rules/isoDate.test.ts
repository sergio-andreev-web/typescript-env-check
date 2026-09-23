import test from 'node:test';
import assert from 'node:assert/strict';
import { IsoDateRule } from './isoDate.js';

test('isoDate accepts valid and rejects invalid values', () => {
  const rule = new IsoDateRule();
  assert.equal(rule.validate("2026-09-23"), true);
  assert.equal(rule.validate("23/09/2026"), false);
  assert.equal(rule.inspect("2026-09-23").valid, true);
  assert.throws(() => rule.assert("23/09/2026"));
});

test('isoDate options are immutable between instances', () => {
  const original = new IsoDateRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("2026-09-23"), true);
  assert.equal(extended.validate("2026-09-23"), false);
});
