import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { globalStyles } from "../../style/styles";
import { hasChunks, parseChunks, Token } from "../../utils/chunk";
import { ServerMessage } from "../../utils/messages";
import { socket } from "../../utils/socket";
import { isEmpty, sleep } from "../../utils/util";

// Components
import "../Chunk/Chunk";
import "../TokenStream/TokenStream";
import "../InfoBox/InfoBox";

@customElement("x-textpanel")
export class TextPanel extends LitElement {
  static styles = [
    ...globalStyles,
    css`
      :host {
        box-sizing: border-box;
        display: block;
        height: 100%;
        width: 100%;
        padding-right: 8px;
        overflow-y: scroll;
      }
    `,
  ];

  @state()
  chunks: Record<number, string> = [];

  @state()
  stream: string = "";

  @state()
  initialChunk: string = "";

  constructor() {
    super();

    socket.on("from_server", ({ cmd, data }) => {
      console.log({ cmd, data });
      switch (cmd) {
        case ServerMessage.UPDATE_CHUNK:
          this.stream = "";
          this.updateChunks(data.html);
          break;

        case ServerMessage.STREAM_TOKEN:
          this.stream += data.reduce(
            (a: string, t: Token) => a + t.decoded,
            ""
          );
          break;

        case ServerMessage.UPDATE_SCREEN:
          if (hasChunks(data)) {
            this.updateChunks(data);
          } else {
            this.setInitialChunk(data);
          }
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
    }

    this.requestUpdate();
  }

  setInitialChunk(html: string) {
    this.chunks = [];
    this.initialChunk = html;
  }

  removeChunk(id: number) {
    delete this.chunks[id];
    this.requestUpdate();
  }

  render() {
    if (isEmpty(this.chunks)) {
      return html`<x-info-box content=${this.initialChunk}></x-info-box> `;
    }

    return html`<div>
      ${map(
        Object.entries(this.chunks),
        ([_, chunk]) => html`<x-chunk editable content=${chunk}></x-chunk>`
      )}
      <x-token-stream tokens=${this.stream}></x-token-stream>
    </div>`;
  }
}
