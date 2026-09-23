import { EmailRule } from './email.js';
import { UrlRule } from './url.js';
import { Ipv4Rule } from './ipv4.js';
import { HostnameRule } from './hostname.js';
import { SlugRule } from './slug.js';
import { UuidRule } from './uuid.js';
import { IsoDateRule } from './isoDate.js';
import { IsoTimeRule } from './isoTime.js';
import { SemverRule } from './semver.js';
import { HexColorRule } from './hexColor.js';
import { MacAddressRule } from './macAddress.js';
import { Sha256Rule } from './sha256.js';
import { Base64Rule } from './base64.js';
import { HexRule } from './hex.js';
import { AlphaRule } from './alpha.js';
import { AlphanumericRule } from './alphanumeric.js';
import { LowercaseRule } from './lowercase.js';
import { UppercaseRule } from './uppercase.js';
import { IdentifierRule } from './identifier.js';
import { KebabCaseRule } from './kebabCase.js';
import { SnakeCaseRule } from './snakeCase.js';
import { PortRule } from './port.js';
import { PosixPathRule } from './posixPath.js';
import { JsonObjectRule } from './jsonObject.js';
import { CsvListRule } from './csvList.js';
import { IntegerRule } from './integer.js';
import { DecimalRule } from './decimal.js';
import { BooleanTextRule } from './booleanText.js';
import { TimezoneRule } from './timezone.js';
import { LocaleRule } from './locale.js';
import { HttpMethodRule } from './httpMethod.js';
import { MimeTypeRule } from './mimeType.js';
import { DockerImageRule } from './dockerImage.js';
import { GitRefRule } from './gitRef.js';
import { EnvKeyRule } from './envKey.js';
import { CidrRule } from './cidr.js';
import type { StringRule } from './types.js';

const factories: Record<string, () => StringRule> = {
  email: () => new EmailRule(),
  url: () => new UrlRule(),
  ipv4: () => new Ipv4Rule(),
  hostname: () => new HostnameRule(),
  slug: () => new SlugRule(),
  uuid: () => new UuidRule(),
  isoDate: () => new IsoDateRule(),
  isoTime: () => new IsoTimeRule(),
  semver: () => new SemverRule(),
  hexColor: () => new HexColorRule(),
  macAddress: () => new MacAddressRule(),
  sha256: () => new Sha256Rule(),
  base64: () => new Base64Rule(),
  hex: () => new HexRule(),
  alpha: () => new AlphaRule(),
  alphanumeric: () => new AlphanumericRule(),
  lowercase: () => new LowercaseRule(),
  uppercase: () => new UppercaseRule(),
  identifier: () => new IdentifierRule(),
  kebabCase: () => new KebabCaseRule(),
  snakeCase: () => new SnakeCaseRule(),
  port: () => new PortRule(),
  posixPath: () => new PosixPathRule(),
  jsonObject: () => new JsonObjectRule(),
  csvList: () => new CsvListRule(),
  integer: () => new IntegerRule(),
  decimal: () => new DecimalRule(),
  booleanText: () => new BooleanTextRule(),
  timezone: () => new TimezoneRule(),
  locale: () => new LocaleRule(),
  httpMethod: () => new HttpMethodRule(),
  mimeType: () => new MimeTypeRule(),
  dockerImage: () => new DockerImageRule(),
  gitRef: () => new GitRefRule(),
  envKey: () => new EnvKeyRule(),
  cidr: () => new CidrRule()
};

export function getRule(name: string): StringRule | undefined {
  return factories[name]?.();
}

export function ruleNames(): string[] {
  return Object.keys(factories).sort();
}
