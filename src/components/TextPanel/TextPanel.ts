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
    }
  `;

  @state()
  chunks: string[] = [];

  constructor() {
    super();

    socket.on("from_server", ({ cmd, data }) => {
      console.log({ cmd, data });
      switch (cmd) {
        case ServerMessage.UPDATE_CHUNK:
          this.updateChunks(data.html);

        case ServerMessage.UPDATE_SCREEN:
          this.updateChunks(data);
      }
    });
  }

  updateChunks(html: string) {
    const chunks = parseChunks(html);

    for (const chunk of chunks) {
      this.chunks[chunk.index] = chunk.content;
      this.requestUpdate();
    }

    console.log({ chunks });
    return;
  }

  render() {
    return html` <div>
      ${this.chunks.map((chunk) => html`<x-chunk content=${chunk}></x-chunk>`)}
    </div>`;
  }
}
