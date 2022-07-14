import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { parseChunkContent } from "../../utils/chunk";
import { ServerMessage } from "../../utils/messages";
import { socket } from "../../utils/socket";

// Components
import "../Chunk/Chunk";

@customElement("x-textpanel")
export class TextPanel extends LitElement {
  @state()
  chunks: string[] = [];

  constructor() {
    super();

    socket.on("from_server", ({ cmd, data }) => {
      switch (cmd) {
        case ServerMessage.UPDATE_CHUNK:
          this.onUpdateChunk(data);
      }
    });
  }

  onUpdateChunk(data: any) {
    const content = parseChunkContent(data.html);

    if (content) {
      this.chunks[data.index] = content;
      this.requestUpdate();
    }

    console.log({ data });
    return;
  }

  render() {
    return html` <div>
      ${this.chunks.map((chunk) => html`<x-chunk content=${chunk}></x-chunk>`)}
    </div>`;
  }
}
