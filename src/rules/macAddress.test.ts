import test from 'node:test';
import assert from 'node:assert/strict';
import { MacAddressRule } from './macAddress.js';

test('macAddress accepts valid and rejects invalid values', () => {
  const rule = new MacAddressRule();
  assert.equal(rule.validate("aa:bb:cc:dd:ee:ff"), true);
  assert.equal(rule.validate("aa-bb-cc"), false);
  assert.equal(rule.inspect("aa:bb:cc:dd:ee:ff").valid, true);
  assert.throws(() => rule.assert("aa-bb-cc"));
});

test('macAddress options are immutable between instances', () => {
  const original = new MacAddressRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("aa:bb:cc:dd:ee:ff"), true);
  assert.equal(extended.validate("aa:bb:cc:dd:ee:ff"), false);
});
