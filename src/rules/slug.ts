import type { RuleInspection, RuleOptions, StringRule } from './types.js';

export class SlugRule implements StringRule {
  readonly id = 'slug';
  readonly description = 'Validates slug values';
  readonly pattern = new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$");
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
      errors.push(this.options.message ?? 'Invalid slug value');
    }
    return { valid: errors.length === 0, value: normalized, errors };
  }

  assert(value: string): string {
    const result = this.inspect(value);
    if (!result.valid) throw new Error(result.errors.join('; '));
    return result.value;
  }

  withOptions(options: RuleOptions): SlugRule {
    return new SlugRule({ ...this.options, ...options });
  }

  toJSON() {
    return { id: this.id, description: this.description, options: this.options };
  }
}
