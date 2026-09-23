import test from 'node:test';
import assert from 'node:assert/strict';
import { SemverRule } from './semver.js';

test('semver accepts valid and rejects invalid values', () => {
  const rule = new SemverRule();
  assert.equal(rule.validate("1.2.3"), true);
  assert.equal(rule.validate("latest"), false);
  assert.equal(rule.inspect("1.2.3").valid, true);
  assert.throws(() => rule.assert("latest"));
});

test('semver options are immutable between instances', () => {
  const original = new SemverRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("1.2.3"), true);
  assert.equal(extended.validate("1.2.3"), false);
});
