import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../../style/styles";

@customElement("x-navbar")
export class Navbar extends LitElement {
  static styles = [...globalStyles, css``];

  render() {
    return html` <div class="navbar"></div> `;
  }
}
