import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../style/styles";
import { IconType } from "./types";

@customElement("x-icon")
export class Icon extends LitElement {
  static styles = [...globalStyles, css``];

  @property()
  icon?: IconType;

  render() {
    if (this.icon) {
      return html` <link
          href="https://css.gg/${this.icon}.css"
          rel="stylesheet"
        />
        <i class="gg-${this.icon}"></i>`;
    }
  }
}
