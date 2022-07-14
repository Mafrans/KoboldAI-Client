import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IconType } from "../Icon/types";

// Components
import "../Icon/Icon";

@customElement("x-icon-button")
export class IconButton extends LitElement {
  static styles = css`
    button {
      padding: 12px;
      border-radius: 999px;
      border: none;
      background: var(--color-indigo-200);
      color: var(--color-indigo-900);
      cursor: pointer;
      transition: opacity 125ms ease, transform 125ms ease;
    }

    button:hover {
      opacity: 0.75;
    }

    button:active {
      transform: scale(0.9);
      transition: 50ms ease;
    }
  `;

  @property()
  icon: IconType = "shape-circle";

  render() {
    return html`
      <button>
        <x-icon icon=${this.icon}></x-icon>
      </button>
    `;
  }
}
