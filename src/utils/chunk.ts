type Chunk = {
  id: number;
  content: string;
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
