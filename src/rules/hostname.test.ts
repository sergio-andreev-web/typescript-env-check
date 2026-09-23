import test from 'node:test';
import assert from 'node:assert/strict';
import { HostnameRule } from './hostname.js';

test('hostname accepts valid and rejects invalid values', () => {
  const rule = new HostnameRule();
  assert.equal(rule.validate("api.example.com"), true);
  assert.equal(rule.validate("bad host"), false);
  assert.equal(rule.inspect("api.example.com").valid, true);
  assert.throws(() => rule.assert("bad host"));
});

test('hostname options are immutable between instances', () => {
  const original = new HostnameRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("api.example.com"), true);
  assert.equal(extended.validate("api.example.com"), false);
});
