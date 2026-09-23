from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
specs={
'email':(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', 'user@example.com', 'not-an-email'),
'url':(r'^https?://[^\s/]+(?:/[^\s]*)?$', 'https://example.com/path', 'ftp://example.com'),
'ipv4':(r'^(?:\d{1,3}\.){3}\d{1,3}$', '192.0.2.1', 'host.local'),
'hostname':(r'^[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?$', 'api.example.com', 'bad host'),
'slug':(r'^[a-z0-9]+(?:-[a-z0-9]+)*$', 'release-notes', 'Bad Slug'),
'uuid':(r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$', '123e4567-e89b-12d3-a456-426614174000', '1234'),
'isoDate':(r'^\d{4}-\d{2}-\d{2}$', '2026-09-23', '23/09/2026'),
'isoTime':(r'^\d{2}:\d{2}(?::\d{2})?$', '12:30:45', '12pm'),
'semver':(r'^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$', '1.2.3', 'latest'),
'hexColor':(r'^#[0-9a-fA-F]{6}$', '#aabbcc', 'blue'),
'macAddress':(r'^(?:[0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$', 'aa:bb:cc:dd:ee:ff', 'aa-bb-cc'),
'sha256':(r'^[0-9a-fA-F]{64}$', 'a'*64, 'sha256'),
'base64':(r'^[A-Za-z0-9+/]+={0,2}$', 'SGVsbG8=', 'invalid?'),
'hex':(r'^[0-9a-fA-F]+$', 'deadbeef', 'not-hex'),
'alpha':(r'^[A-Za-z]+$', 'Alphabet', 'abc123'),
'alphanumeric':(r'^[A-Za-z0-9]+$', 'abc123', 'abc-123'),
'lowercase':(r'^[a-z]+$', 'lowercase', 'Upper'),
'uppercase':(r'^[A-Z]+$', 'UPPERCASE', 'Lower'),
'identifier':(r'^[A-Za-z_][A-Za-z0-9_]*$', 'SOME_KEY', '123key'),
'kebabCase':(r'^[a-z]+(?:-[a-z]+)*$', 'some-key', 'some_key'),
'snakeCase':(r'^[a-z]+(?:_[a-z]+)*$', 'some_key', 'some-key'),
'port':(r'^\d{1,5}$', '8080', 'port'),
'posixPath':(r'^/(?:[^\s/]+/?)*$', '/var/log/app', 'relative/path'),
'jsonObject':(r'^\{.*\}$', '{"x":1}', '[1,2]'),
'csvList':(r'^[^,]+(?:,[^,]+)+$', 'one,two', 'one'),
'integer':(r'^-?\d+$', '-42', '1.5'),
'decimal':(r'^-?\d+(?:\.\d+)?$', '12.5', 'abc'),
'booleanText':(r'^(?:true|false)$', 'true', 'yes'),
'timezone':(r'^[A-Za-z_]+/[A-Za-z_]+$', 'Europe/Moscow', 'UTC+3'),
'locale':(r'^[a-z]{2}(?:-[A-Z]{2})?$', 'en-US', 'english'),
'httpMethod':(r'^(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)$', 'POST', 'FETCH'),
'mimeType':(r'^[a-z]+/[a-z0-9.+-]+$', 'application/json', 'json'),
'dockerImage':(r'^[a-z0-9._/-]+(?::[a-zA-Z0-9._-]+)?$', 'nginx:1.27', 'Bad Image'),
'gitRef':(r'^[A-Za-z0-9._/-]+$', 'feature/task', 'bad ref'),
'envKey':(r'^[A-Z][A-Z0-9_]*$', 'APP_PORT', 'app-port'),
'cidr':(r'^(?:\d{1,3}\.){3}\d{1,3}/\d{1,2}$', '192.0.2.0/24', '192.0.2.1'),
}

def class_name(name): return name[0].upper()+name[1:]+'Rule'
for name,(pattern,valid,invalid) in specs.items():
    cls=class_name(name)
    regex=json.dumps(pattern)
    content=f'''import type {{ RuleInspection, RuleOptions, StringRule }} from './types.js';

export class {cls} implements StringRule {{
  readonly id = '{name}';
  readonly description = 'Validates {name} values';
  readonly pattern = new RegExp({regex});
  readonly options: RuleOptions;

  constructor(options: RuleOptions = {{}}) {{
    this.options = {{ trim: true, ...options }};
  }}

  normalize(value: string): string {{
    if (typeof value !== 'string') throw new TypeError('Expected a string');
    return this.options.trim ? value.trim() : value;
  }}

  validate(value: string): boolean {{
    if (typeof value !== 'string') return false;
    const normalized = this.normalize(value);
    if (!normalized) return false;
    if (this.options.minLength !== undefined && normalized.length < this.options.minLength) return false;
    if (this.options.maxLength !== undefined && normalized.length > this.options.maxLength) return false;
    return this.pattern.test(normalized);
  }}

  inspect(value: string): RuleInspection {{
    const normalized = this.normalize(value);
    const errors: string[] = [];
    if (!normalized) errors.push('Value is empty');
    if (this.options.minLength !== undefined && normalized.length < this.options.minLength) {{
      errors.push(`Minimum length is ${{this.options.minLength}}`);
    }}
    if (this.options.maxLength !== undefined && normalized.length > this.options.maxLength) {{
      errors.push(`Maximum length is ${{this.options.maxLength}}`);
    }}
    if (normalized && !this.pattern.test(normalized)) {{
      errors.push(this.options.message ?? 'Invalid {name} value');
    }}
    return {{ valid: errors.length === 0, value: normalized, errors }};
  }}

  assert(value: string): string {{
    const result = this.inspect(value);
    if (!result.valid) throw new Error(result.errors.join('; '));
    return result.value;
  }}

  withOptions(options: RuleOptions): {cls} {{
    return new {cls}({{ ...this.options, ...options }});
  }}

  toJSON() {{
    return {{ id: this.id, description: this.description, options: this.options }};
  }}
}}
'''
    (root/'src/rules'/f'{name}.ts').write_text(content)
    test=f'''import test from 'node:test';
import assert from 'node:assert/strict';
import {{ {cls} }} from './{name}.js';

test('{name} accepts valid and rejects invalid values', () => {{
  const rule = new {cls}();
  assert.equal(rule.validate({json.dumps(valid)}), true);
  assert.equal(rule.validate({json.dumps(invalid)}), false);
  assert.equal(rule.inspect({json.dumps(valid)}).valid, true);
  assert.throws(() => rule.assert({json.dumps(invalid)}));
}});

test('{name} options are immutable between instances', () => {{
  const original = new {cls}();
  const extended = original.withOptions({{ maxLength: 2 }});
  assert.equal(original.validate({json.dumps(valid)}), true);
  assert.equal(extended.validate({json.dumps(valid)}), false);
}});
'''
    (root/'src/rules'/f'{name}.test.ts').write_text(test)
imports='\n'.join(f"import {{ {class_name(name)} }} from './{name}.js';" for name in specs)
entries=',\n'.join(f'  {name}: () => new {class_name(name)}()' for name in specs)
registry=imports+'''\nimport type { StringRule } from './types.js';

const factories: Record<string, () => StringRule> = {
'''+entries+'''
};

export function getRule(name: string): StringRule | undefined {
  return factories[name]?.();
}

export function ruleNames(): string[] {
  return Object.keys(factories).sort();
}
'''
(root/'src/rules/index.ts').write_text(registry)
print('Generated',len(specs),'rules')
