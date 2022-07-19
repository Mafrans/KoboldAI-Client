import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { globalStyles } from "../../style/styles";

@customElement("x-chunk")
export class Chunk extends LitElement {
  static styles = [...globalStyles, css``];

  @property()
  content: string = "";

  constructor() {
    super();
  }

  render() {
    return html`<span contenteditable> ${unsafeHTML(this.content)} </span>`;
  }
}
