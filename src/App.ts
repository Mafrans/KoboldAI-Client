import "@fontsource/inter";
import { html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import "./components/Chunk";
import "./style/main.css";
import { parseChunkContent } from "./utils/chunk";
import { ServerMessage } from "./utils/messages";
import { socket } from "./utils/socket";

@customElement("x-app")
export class App extends LitElement {
  @state()
  chunks: string[] = [];

  @state()
  sid?: string;

  @query("input")
  input?: HTMLInputElement;

  constructor() {
    super();

    socket.on("from_server", ({ cmd, data }) => {
      switch (cmd) {
        case ServerMessage.UPDATE_CHUNK:
          const content = parseChunkContent(data.html);

          if (content) {
            this.chunks[data.index] = content;
            this.requestUpdate();
          }

          console.log({ data });
          return;
      }
    });
  }

  onSubmit() {
    socket.send({
      cmd: "submit",
      allowabort: true,
      actionmode: 0,
      data: this.input?.value,
    });
  }

  render() {
    return html` <div>
      ${this.chunks.map((chunk) => html`<x-chunk content=${chunk}></x-chunk>`)}
      <input type="text" />
      <button type="button" @click=${this.onSubmit}>Submit</button>
    </div>`;
  }
}
