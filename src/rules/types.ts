export type RuleOptions = {
  trim?: boolean;
  minLength?: number;
  maxLength?: number;
  message?: string;
};

export type RuleInspection = {
  valid: boolean;
  value: string;
  errors: string[];
};

export interface StringRule {
  readonly id: string;
  readonly description: string;
  validate(value: string): boolean;
  normalize(value: string): string;
  inspect(value: string): RuleInspection;
  assert(value: string): string;
  withOptions(options: RuleOptions): StringRule;
  toJSON(): { id: string; description: string; options: RuleOptions };
}
