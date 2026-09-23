import type { EnvValues } from './env.js';

export type ValueType = 'string' | 'number' | 'boolean';
export type Rule = ValueType | {
  type: ValueType;
  required?: boolean;
  default?: string;
  enum?: string[];
  min?: number;
  max?: number;
  pattern?: string;
};
export type Schema = Record<string, Rule>;
export type ValidationResult = { errors: string[]; values: EnvValues };

function toRule(rule: Rule): Exclude<Rule, string> {
  return typeof rule === 'string' ? { type: rule } : rule;
}

export function validate(schema: Schema, input: EnvValues, strict = false): ValidationResult {
  const errors: string[] = [];
  const values: EnvValues = { ...input };
  if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
    return { errors: ['schema must be an object'], values };
  }
  for (const [key, rawRule] of Object.entries(schema)) {
    const rule = toRule(rawRule);
    if (!rule || !['string', 'number', 'boolean'].includes(rule.type)) {
      errors.push(`${key}: invalid schema rule`);
      continue;
    }
    if (values[key] === undefined || values[key] === '') {
      if (rule.default !== undefined) values[key] = rule.default;
      else if (rule.required !== false) { errors.push(`${key}: missing`); continue; }
      else continue;
    }
    const value = values[key];
    if (rule.type === 'number' && !Number.isFinite(Number(value))) {
      errors.push(`${key}: expected number`);
      continue;
    }
    if (rule.type === 'boolean' && !['true', 'false'].includes(value)) {
      errors.push(`${key}: expected boolean`);
      continue;
    }
    if (rule.enum && !rule.enum.includes(value)) errors.push(`${key}: not in allowed values`);
    if (rule.min !== undefined) {
      const actual = rule.type === 'number' ? Number(value) : value.length;
      if (actual < rule.min) errors.push(`${key}: below minimum ${rule.min}`);
    }
    if (rule.max !== undefined) {
      const actual = rule.type === 'number' ? Number(value) : value.length;
      if (actual > rule.max) errors.push(`${key}: above maximum ${rule.max}`);
    }
    if (rule.pattern) {
      try {
        if (!new RegExp(rule.pattern).test(value)) errors.push(`${key}: does not match pattern`);
      } catch {
        errors.push(`${key}: invalid pattern in schema`);
      }
    }
  }
  if (strict) {
    for (const key of Object.keys(values)) {
      if (!Object.hasOwn(schema, key)) errors.push(`${key}: unknown key`);
    }
  }
  return { errors, values };
}
