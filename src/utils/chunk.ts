type Chunk = {
  index: number;
  content: string;
};

const parser = new DOMParser();

export function parseChunks(html: string): Chunk[] {
  const document = parser.parseFromString(html, "text/html");
  const chunks = Array.from(document.querySelectorAll("chunk"));

  return chunks
    .map((chunk) => ({
      content: chunk.innerHTML ?? "",
      index: Number(chunk.getAttribute("n")),
    }))
    .filter((chunk) => !isNaN(chunk.index));
}
