export function parseChunkContent(html: string): string | undefined {
  const contentMatches = html.match(/<chunk.+?>(.+?)<\/chunk>/);
  return contentMatches?.[1];
}
