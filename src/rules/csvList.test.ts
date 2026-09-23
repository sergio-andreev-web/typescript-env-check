import test from 'node:test';
import assert from 'node:assert/strict';
import { CsvListRule } from './csvList.js';

test('csvList accepts valid and rejects invalid values', () => {
  const rule = new CsvListRule();
  assert.equal(rule.validate("one,two"), true);
  assert.equal(rule.validate("one"), false);
  assert.equal(rule.inspect("one,two").valid, true);
  assert.throws(() => rule.assert("one"));
});

test('csvList options are immutable between instances', () => {
  const original = new CsvListRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("one,two"), true);
  assert.equal(extended.validate("one,two"), false);
});
