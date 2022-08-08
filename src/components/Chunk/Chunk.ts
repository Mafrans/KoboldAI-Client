import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { globalStyles } from "../../style/styles";

@customElement("x-chunk")
export class Chunk extends LitElement {
  static styles = [
    ...globalStyles,
    css`
      p {
        display: inline;
        line-height: 1.75;
      }

      p:focus {
        outline: none;
        padding: 4px 0;
        background-color: var(--color-indigo-100);
        border-radius: 4px;
      }

      p::selection {
        background-color: var(--color-indigo-500);
        color: white;
      }

      .line-break {
        margin-bottom: 1.25em;
      }
    `,
  ];

  @property()
  content: string = "";

  @property({ type: Boolean })
  editable: boolean = false;

  constructor() {
    super();
  }

  render() {
    return html`<p ?contenteditable=${this.editable}>
      ${unsafeHTML(
        this.content.replaceAll("<br>", `<div class="line-break"></div>`)
      )}
    </p>`;
  }
}
