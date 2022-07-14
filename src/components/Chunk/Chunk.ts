import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("x-chunk")
export class Chunk extends LitElement {
  @property()
  content: string = "";

  constructor() {
    super();
  }

  render() {
    return html`<span contenteditable> ${unsafeHTML(this.content)} </span>`;
  }
}
