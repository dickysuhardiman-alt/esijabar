/**
 * Simple classnames utility (similar to clsx/classnames)
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;

export function cn(...inputs: ClassValue[]): string {
  let result = '';

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      result += (result ? ' ' : '') + input;
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) {
        result += (result ? ' ' : '') + nested;
      }
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          result += (result ? ' ' : '') + key;
        }
      }
    }
  }

  return result;
}

/**
 * Conditional classnames utility
 */
export function conditionalClasses(
  conditions: Record<string, boolean | undefined | null>
): string {
  return Object.entries(conditions)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key)
    .join(' ');
}
