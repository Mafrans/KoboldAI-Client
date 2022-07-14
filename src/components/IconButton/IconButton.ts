import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IconType } from "../Icon/types";

// Components
import "../Icon/Icon";

@customElement("x-icon-button")
export class IconButton extends LitElement {
  static styles = css`
    button {
      width: 42px;
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 999px;
      border: none;
      background: var(--color-indigo-200);
      color: var(--color-indigo-900);
      cursor: pointer;
      transition: opacity 125ms ease, transform 125ms ease;
    }

    button:focus-visible {
      outline: var(--outline-focus);
      outline-offset: 3px;
    }

    button:hover {
      opacity: 0.75;
    }

    button:active {
      transform: scale(0.9);
      transition: 50ms ease;
    }

    button:disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  `;

  @property()
  icon: IconType = "shape-circle";

  @property({ type: Boolean })
  disabled: boolean = false;

  render() {
    return html`
      <button ?disabled=${this.disabled}>
        <x-icon icon=${this.icon}></x-icon>
      </button>
    `;
  }
}
