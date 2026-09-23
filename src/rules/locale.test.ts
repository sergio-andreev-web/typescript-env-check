import test from 'node:test';
import assert from 'node:assert/strict';
import { LocaleRule } from './locale.js';

test('locale accepts valid and rejects invalid values', () => {
  const rule = new LocaleRule();
  assert.equal(rule.validate("en-US"), true);
  assert.equal(rule.validate("english"), false);
  assert.equal(rule.inspect("en-US").valid, true);
  assert.throws(() => rule.assert("english"));
});

test('locale options are immutable between instances', () => {
  const original = new LocaleRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("en-US"), true);
  assert.equal(extended.validate("en-US"), false);
});
