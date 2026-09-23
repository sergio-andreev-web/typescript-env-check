import test from 'node:test';
import assert from 'node:assert/strict';
import { UrlRule } from './url.js';

test('url accepts valid and rejects invalid values', () => {
  const rule = new UrlRule();
  assert.equal(rule.validate("https://example.com/path"), true);
  assert.equal(rule.validate("ftp://example.com"), false);
  assert.equal(rule.inspect("https://example.com/path").valid, true);
  assert.throws(() => rule.assert("ftp://example.com"));
});

test('url options are immutable between instances', () => {
  const original = new UrlRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("https://example.com/path"), true);
  assert.equal(extended.validate("https://example.com/path"), false);
});
