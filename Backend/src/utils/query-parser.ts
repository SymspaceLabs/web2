// utils/query-parser.ts

export function parseCommaSeparatedParam(param?: string | string[]): string[] | undefined {
  if (Array.isArray(param)) {
    return param.filter(Boolean);
  }

  if (typeof param === 'string') {
    const values = param
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v);

    return values.length > 0 ? values : undefined;
  }

  return undefined;
}
