import test from 'node:test';
import assert from 'node:assert/strict';
import { SlugRule } from './slug.js';

test('slug accepts valid and rejects invalid values', () => {
  const rule = new SlugRule();
  assert.equal(rule.validate("release-notes"), true);
  assert.equal(rule.validate("Bad Slug"), false);
  assert.equal(rule.inspect("release-notes").valid, true);
  assert.throws(() => rule.assert("Bad Slug"));
});

test('slug options are immutable between instances', () => {
  const original = new SlugRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("release-notes"), true);
  assert.equal(extended.validate("release-notes"), false);
});
