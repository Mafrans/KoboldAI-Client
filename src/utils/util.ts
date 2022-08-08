export function isEmpty(record: Record<never, never>): boolean {
  return Object.keys(record).length == 0;
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
