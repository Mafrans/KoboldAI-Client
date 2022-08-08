import "@fontsource/inter";
import "@fontsource/recursive";
import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import "./style/styles.ts";
import { GameState, ServerMessage } from "./utils/messages";
import { socket } from "./utils/socket";

import "./components/ControlPanel/ControlPanel";
import "./components/Navbar/Navbar";
import "./components/SequencePanel/SequencePanel";
import "./components/TextPanel/TextPanel";

@customElement("x-app")
export class App extends LitElement {
  static styles = css`
    .app {
      display: grid;
      grid-template-rows: 70px 1fr;
      grid-template-columns: calc(30vw - 200px) 1fr calc(30vw - 200px);

      height: 100vh;
    }

    x-navbar {
      grid-column: span 3;
    }

    x-textpanel {
      flex: 1;
    }

    main {
      box-sizing: border-box;
      height: calc(100vh - 70px);
      display: flex;
      gap: 8px;
      padding: 16px;
      padding-top: min(3vw, 64px);
      flex-direction: column;
    }
  `;

  @state()
  gameState: GameState = GameState.READY;

  @query("form")
  form?: HTMLFormElement;

  constructor() {
    super();

    socket.on("from_server", ({ cmd, data }) => {
      switch (cmd) {
        case ServerMessage.SET_GAME_STATE:
          this.gameState = data;
      }
    });
  }
  render() {
    return html`
      <div class="app">
        <x-navbar></x-navbar>

        <aside class="sidebar"></aside>

        <main>
          <x-textpanel></x-textpanel>
          <x-sequence-panel></x-sequence-panel>
          <x-control-panel
            ?waiting=${this.gameState === GameState.WAIT}
          ></x-control-panel>
        </main>

        <aside class="sidebar"></aside>
      </div>
    `;
  }
}
