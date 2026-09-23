import test from 'node:test';
import assert from 'node:assert/strict';
import { DockerImageRule } from './dockerImage.js';

test('dockerImage accepts valid and rejects invalid values', () => {
  const rule = new DockerImageRule();
  assert.equal(rule.validate("nginx:1.27"), true);
  assert.equal(rule.validate("Bad Image"), false);
  assert.equal(rule.inspect("nginx:1.27").valid, true);
  assert.throws(() => rule.assert("Bad Image"));
});

test('dockerImage options are immutable between instances', () => {
  const original = new DockerImageRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("nginx:1.27"), true);
  assert.equal(extended.validate("nginx:1.27"), false);
});
