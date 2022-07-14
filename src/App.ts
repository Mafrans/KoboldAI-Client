import "@fontsource/inter";
import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import "./style/main.css";
import { socket } from "./utils/socket";

// Components
import "./components/IconButton/IconButton";
import "./components/Navbar/Navbar";
import "./components/TextField/TextField";
import "./components/TextPanel/TextPanel";
import { GameState, ServerMessage } from "./utils/messages";

@customElement("x-app")
export class App extends LitElement {
  static styles = css`
    .app {
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
      grid-template-rows: 70px 1fr;

      min-height: 100vh;
    }

    x-navbar {
      grid-column: span 3;
    }

    x-textpanel {
      flex: 1;
    }

    main {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    main form {
      display: grid;
      grid-template-columns: 1fr max-content;
      margin: 0;
      gap: 16px;
    }
  `;

  @state()
  inputText: string = "";

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

  handleInput({ detail: { value } }: CustomEvent) {
    this.inputText = value;
  }

  handleSubmit() {
    socket.send({
      cmd: "submit",
      allowabort: true,
      actionmode: 0,
      data: this.inputText,
    });

    this.inputText = "";
    this.requestUpdate();
  }

  render() {
    const waiting = this.gameState === GameState.WAIT;

    return html`
      <div class="app">
        <x-navbar></x-navbar>
        <aside></aside>
        <main>
          <x-textpanel></x-textpanel>
          <form method="dialog">
            <x-text-field
              value=${this.inputText}
              type="text"
              name="text"
              @input=${this.handleInput}
            ></x-text-field>

            <x-icon-button
              icon=${waiting ? "spinner" : "corner-down-right"}
              ?disabled=${waiting}
              @click=${this.handleSubmit}
            ></x-icon-button>
          </form>
        </main>
      </div>
    `;
  }
}
