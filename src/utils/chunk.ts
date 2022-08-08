export type Chunk = {
  id: number;
  content: string;
};

export type Token = {
  decoded: string;
  probabilities: unknown;
};

const parser = new DOMParser();

export function parseChunks(html: string): Chunk[] {
  const document = parser.parseFromString(html, "text/html");
  const chunks = Array.from(document.querySelectorAll("chunk"));

  return chunks
    .map((chunk) => ({
      id: Number(chunk.getAttribute("n")),
      content: chunk.innerHTML ?? "",
    }))
    .filter((chunk) => !isNaN(chunk.id));
}

export function hasChunks(html: string): boolean {
  const document = parser.parseFromString(html, "text/html");
  return document.querySelectorAll("chunk").length > 0;
}
