export function isEmpty(record: Record<never, never>): boolean {
  return Object.keys(record).length == 0;
}
