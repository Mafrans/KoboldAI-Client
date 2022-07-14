import "@fontsource/inter";
import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import "./style/main.css";
import { socket } from "./utils/socket";

// Components
import "./components/TextPanel/TextPanel";

@customElement("x-app")
export class App extends LitElement {
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
      <x-textpanel></x-textpanel>
      <input type="text" />
      <button type="button" @click=${this.handleSubmit}>Submit</button>
    `;
  }
}
