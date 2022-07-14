import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { parseChunks } from "../../utils/chunk";
import { ServerMessage } from "../../utils/messages";
import { socket } from "../../utils/socket";

// Components
import "../Chunk/Chunk";

@customElement("x-textpanel")
export class TextPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow-y: scroll;
    }
  `;

  @state()
  chunks: Record<number, string> = [];

  constructor() {
    super();

    socket.on("from_server", ({ cmd, data }) => {
      console.log({ cmd, data });
      switch (cmd) {
        case ServerMessage.UPDATE_CHUNK:
          this.updateChunks(data.html);
          break;

        case ServerMessage.UPDATE_SCREEN:
          this.updateChunks(data);
          break;

        case ServerMessage.REMOVE_CHUNK:
          this.removeChunk(data);
      }
    });
  }

  updateChunks(html: string) {
    const chunks = parseChunks(html);

    for (const chunk of chunks) {
      this.chunks[chunk.id] = chunk.content;
      this.requestUpdate();
    }

    return;
  }

  removeChunk(id: number) {
    delete this.chunks[id];
    this.requestUpdate();
  }

  render() {
    return html` <div>
      ${Object.entries(this.chunks).map(
        ([_, chunk]) => html`<x-chunk content=${chunk}></x-chunk>`
      )}
    </div>`;
  }
}
