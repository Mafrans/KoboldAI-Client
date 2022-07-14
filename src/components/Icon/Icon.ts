import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IconType } from "./types";

@customElement("x-icon")
export class Icon extends LitElement {
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
