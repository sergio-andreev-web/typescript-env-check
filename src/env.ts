export type EnvValues = Record<string, string>;

export function parseEnv(text: string): EnvValues {
  const values: EnvValues = {};
  for (const [index, source] of text.split(/\r?\n/).entries()) {
    let line = source.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('export ')) line = line.slice(7).trimStart();
    const equals = line.indexOf('=');
    if (equals < 1) throw new Error(`line ${index + 1}: expected KEY=value`);
    const key = line.slice(0, equals).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) throw new Error(`line ${index + 1}: invalid key`);
    if (Object.hasOwn(values, key)) throw new Error(`line ${index + 1}: duplicate key ${key}`);
    let value = line.slice(equals + 1).trim();
    if (value.startsWith('"') || value.startsWith("'")) {
      const quote = value[0];
      if (!value.endsWith(quote) || value.length < 2) throw new Error(`line ${index + 1}: unclosed quote`);
      value = value.slice(1, -1);
      if (quote === '"') value = value.replace(/\\n/g, '\n').replace(/\\"/g, '"');
    } else {
      value = value.replace(/\s+#.*$/, '').trimEnd();
    }
    values[key] = value;
  }
  return values;
}
