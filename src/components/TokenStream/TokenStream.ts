import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { styleMap } from "lit/directives/style-map.js";
import { globalStyles } from "../../style/styles";
import { sleep } from "../../utils/util";

@customElement("x-token-stream")
export class TokenStream extends LitElement {
  static styles = [globalStyles, css``];

  @property()
  tokens: string = "";

  @state()
  progress: number = 0;

  constructor() {
    super();
  }

  async attributeChangedCallback(name: string, old: string, value: string) {
    super.attributeChangedCallback(name, old, value);

    if (value?.length > old?.length) {
      for (let i = 0; i < value.length - old.length; i++) {
        this.progress++;
        this.requestUpdate();

        await sleep(1000 / (value.length - old.length));
      }
    } else {
      this.progress -= old?.length ?? 0 - value?.length ?? 0;
    }
  }

  render() {
    return html` <span>${this.tokens.slice(0, this.progress)}</span> `;
  }
}
