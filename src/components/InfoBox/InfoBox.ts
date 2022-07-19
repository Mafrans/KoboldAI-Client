import { css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("x-info-box")
export class InfoBox extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        padding: 16px;
        border-radius: 8px;
        background-color: var(--color-slate-100);
      }

      code {
        padding: 8px;
        border-radius: 8px;
        background-color: var(--color-slate-500);
        color: white;
        font-family: Recursive, monospace;
        font-style: italic;
        margin: 0 4px;
      }

      a {
        text-decoration: none;
        color: var(--color-indigo-600);
        border-bottom: 1px solid var(--color-indigo-600);
      }
    `,
  ];

  @property()
  content: string = "";

  render() {
    return unsafeHTML(this.content);
  }
}
