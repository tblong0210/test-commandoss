/**
 * Concatenates strings for use as CSS class names.
 * Filters out falsy values (null, undefined, false, '', 0) and joins with spaces.
 *
 * @param {...(string | number | boolean | null | undefined | Record<string, boolean>)[]} classes - Values to concatenate
 * @returns {string} Concatenated class string
 *
 * @example
 * // Returns "btn btn-primary active"
 * clsx('btn', 'btn-primary', true && 'active', false && 'disabled', { selected: false })
 */
export function clsx(...classes: (string | number | boolean | null | undefined | Record<string, boolean>)[]): string {
  return classes
    .flatMap((item) => {
      if (!item) return []

      if (typeof item === 'object') {
        return Object.entries(item)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
      }

      return [item.toString()]
    })
    .filter(Boolean)
    .join(' ')
}
