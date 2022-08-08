import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { globalStyles } from "../../style/styles";

@customElement("x-navbar")
export class Navbar extends LitElement {
  static styles = [
    ...globalStyles,
    css`
      .navbar {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 16px max(16px, 2vw);
        gap: 12px;
        background-color: var(--color-indigo-100);
        color: var(--color-indigo-800);
      }

      .brand {
        display: flex;
        gap: 8px;
        text-decoration: none;
        align-items: center;
        font-weight: 700;
        border-radius: 999px;
        padding: 0 16px;
        height: 42px;
        color: inherit;
        background-color: var(--color-indigo-50);
      }

      .brand img {
        height: 24px;
        width: 24px;
      }
    `,
  ];

  render() {
    return html`<div class="navbar">
      <x-icon-button
        style=${styleMap({
          background: "var(--color-indigo-50)",
        })}
        icon="menu"
      ></x-icon-button>
      <a href="/" class="brand">
        <!-- 🦊 -->
        <img
          src="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f98a.svg"
        />
        <span>KoboldAI</span>
      </a>
    </div> `;
  }
}
