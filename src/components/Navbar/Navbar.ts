import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("x-navbar")
export class Navbar extends LitElement {
  render() {
    return html` <div class="navbar"></div> `;
  }
}
