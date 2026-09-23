import test from 'node:test';
import assert from 'node:assert/strict';
import { KebabCaseRule } from './kebabCase.js';

test('kebabCase accepts valid and rejects invalid values', () => {
  const rule = new KebabCaseRule();
  assert.equal(rule.validate("some-key"), true);
  assert.equal(rule.validate("some_key"), false);
  assert.equal(rule.inspect("some-key").valid, true);
  assert.throws(() => rule.assert("some_key"));
});

test('kebabCase options are immutable between instances', () => {
  const original = new KebabCaseRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("some-key"), true);
  assert.equal(extended.validate("some-key"), false);
});
