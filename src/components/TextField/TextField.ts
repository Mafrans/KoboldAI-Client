import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { TextFieldType } from "./types";

@customElement("x-text-field")
export class TextField extends LitElement {
  static styles = css`
    input {
      appearance: none;
      border: none;
      width: 100%;
      padding: 16px;
      background-color: var(--color-slate-200);
      border-radius: 8px;
    }

    input:focus {
      outline: var(--outline-focus);
      outline-offset: 3px;
    }
  `;

  @property()
  value: string = "";

  @property()
  type: TextFieldType = "text";

  @property()
  label: string = "";

  @property()
  name: string = "";

  handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._dispatchInputEvent();
    event.stopPropagation();
  }

  _dispatchInputEvent() {
    let event = new CustomEvent("input", {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    console.log(this.value);
    return html`
      <input
        .value=${live(this.value)}
        aria-label=${this.label}
        type=${this.type}
        name=${this.name}
        @input=${this.handleInput}
      />
    `;
  }
}
