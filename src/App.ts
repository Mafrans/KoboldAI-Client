import "@fontsource/inter";
import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import "./style/main.css";
import { socket } from "./utils/socket";

// Components
import "./components/Navbar/Navbar";
import "./components/TextPanel/TextPanel";

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

    main {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    x-textpanel {
      flex: 1;
    }

    main form {
      display: grid;
      grid-template-columns: 1fr max-content;
      margin: 0;
    }
  `;

  @query("input")
  input?: HTMLInputElement;

  constructor() {
    super();
  }

  handleSubmit() {
    socket.send({
      cmd: "submit",
      allowabort: true,
      actionmode: 0,
      data: this.input?.value,
    });
  }

  render() {
    return html`
      <div class="app">
        <x-navbar></x-navbar>
        <aside></aside>
        <main>
          <x-textpanel></x-textpanel>
          <form>
            <input type="text" />
            <button type="button" @click=${this.handleSubmit}>Submit</button>
          </form>
        </main>
      </div>
    `;
  }
}
