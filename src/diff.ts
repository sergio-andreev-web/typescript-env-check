import { createHash } from 'node:crypto';
import type { EnvValues } from './env.js';
import type { Schema } from './schema.js';
import { validate } from './schema.js';

export type EnvironmentDiff = {
  added: string[];
  removed: string[];
  changed: string[];
  unchanged: string[];
  leftErrors: string[];
  rightErrors: string[];
};

function fingerprint(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function compareEnvironments(left: EnvValues, right: EnvValues, schema: Schema = {}): EnvironmentDiff {
  const result: EnvironmentDiff = {
    added: [], removed: [], changed: [], unchanged: [],
    leftErrors: validate(schema, left).errors,
    rightErrors: validate(schema, right).errors,
  };
  for (const key of [...new Set([...Object.keys(left), ...Object.keys(right)])].sort()) {
    if (!(key in left)) result.added.push(key);
    else if (!(key in right)) result.removed.push(key);
    else if (fingerprint(left[key]) !== fingerprint(right[key])) result.changed.push(key);
    else result.unchanged.push(key);
  }
  return result;
}

export function mergeEnvironments(base: EnvValues, overrides: EnvValues): EnvValues {
  return { ...base, ...overrides };
}

export function redactEnvironment(values: EnvValues): EnvValues {
  const redacted: EnvValues = {};
  for (const [key, value] of Object.entries(values)) {
    redacted[key] = /(password|secret|token|api_key|private_key)/i.test(key) ? '[REDACTED]' : value;
  }
  return redacted;
}

export function formatDiff(diff: EnvironmentDiff): string {
  const sections: Array<[string, string[]]> = [
    ['Added', diff.added],
    ['Removed', diff.removed],
    ['Changed', diff.changed],
    ['Unchanged', diff.unchanged],
  ];
  const lines: string[] = [];
  for (const [title, keys] of sections) {
    lines.push(`${title} (${keys.length})`);
    for (const key of keys) lines.push(`  ${key}`);
  }
  if (diff.leftErrors.length) lines.push(`Left errors: ${diff.leftErrors.join('; ')}`);
  if (diff.rightErrors.length) lines.push(`Right errors: ${diff.rightErrors.join('; ')}`);
  return lines.join('\n');
}
