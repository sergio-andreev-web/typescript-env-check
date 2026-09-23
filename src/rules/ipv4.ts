import type { RuleInspection, RuleOptions, StringRule } from './types.js';

export class Ipv4Rule implements StringRule {
  readonly id = 'ipv4';
  readonly description = 'Validates ipv4 values';
  readonly pattern = new RegExp("^(?:\\d{1,3}\\.){3}\\d{1,3}$");
  readonly options: RuleOptions;

  constructor(options: RuleOptions = {}) {
    this.options = { trim: true, ...options };
  }

  normalize(value: string): string {
    if (typeof value !== 'string') throw new TypeError('Expected a string');
    return this.options.trim ? value.trim() : value;
  }

  validate(value: string): boolean {
    if (typeof value !== 'string') return false;
    const normalized = this.normalize(value);
    if (!normalized) return false;
    if (this.options.minLength !== undefined && normalized.length < this.options.minLength) return false;
    if (this.options.maxLength !== undefined && normalized.length > this.options.maxLength) return false;
    return this.pattern.test(normalized);
  }

  inspect(value: string): RuleInspection {
    const normalized = this.normalize(value);
    const errors: string[] = [];
    if (!normalized) errors.push('Value is empty');
    if (this.options.minLength !== undefined && normalized.length < this.options.minLength) {
      errors.push(`Minimum length is ${this.options.minLength}`);
    }
    if (this.options.maxLength !== undefined && normalized.length > this.options.maxLength) {
      errors.push(`Maximum length is ${this.options.maxLength}`);
    }
    if (normalized && !this.pattern.test(normalized)) {
      errors.push(this.options.message ?? 'Invalid ipv4 value');
    }
    return { valid: errors.length === 0, value: normalized, errors };
  }

  assert(value: string): string {
    const result = this.inspect(value);
    if (!result.valid) throw new Error(result.errors.join('; '));
    return result.value;
  }

  withOptions(options: RuleOptions): Ipv4Rule {
    return new Ipv4Rule({ ...this.options, ...options });
  }

  toJSON() {
    return { id: this.id, description: this.description, options: this.options };
  }
}
