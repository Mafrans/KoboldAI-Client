import "@fontsource/inter";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./style/main.css";

@customElement("x-app")
export class App extends LitElement {
  render() {
    return html` <div>Hello World!</div>`;
  }
}
