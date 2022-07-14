import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TextFieldType } from "./types";

@customElement("x-text-field")
export class TextField extends LitElement {
  static styles = css`
    input {
      appearance: none;
      border: none;
      width: 100%;
      padding: 12px;
      background-color: var(--color-slate-200);
      border-radius: 8px;
    }

    input:focus {
      outline: var(--outline-focus);
      outline-offset: 3px;
    }
  `;

  @property()
  type: TextFieldType = "text";

  @property()
  label: string = "";

  render() {
    return html` <input aria-label=${this.label} type=${this.type} /> `;
  }
}
