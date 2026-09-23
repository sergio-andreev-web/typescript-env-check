import test from 'node:test';
import assert from 'node:assert/strict';
import { JsonObjectRule } from './jsonObject.js';

test('jsonObject accepts valid and rejects invalid values', () => {
  const rule = new JsonObjectRule();
  assert.equal(rule.validate("{\"x\":1}"), true);
  assert.equal(rule.validate("[1,2]"), false);
  assert.equal(rule.inspect("{\"x\":1}").valid, true);
  assert.throws(() => rule.assert("[1,2]"));
});

test('jsonObject options are immutable between instances', () => {
  const original = new JsonObjectRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("{\"x\":1}"), true);
  assert.equal(extended.validate("{\"x\":1}"), false);
});
