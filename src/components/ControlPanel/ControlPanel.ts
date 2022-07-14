import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ClientMessage } from "../../utils/messages";
import { socket } from "../../utils/socket";

import "../IconButton/IconButton";
import "../TextField/TextField";

@customElement("x-control-panel")
export class ControlPanel extends LitElement {
  static styles = css`
    .input {
      display: flex;
      gap: 16px;
    }

    .input x-text-field {
      flex: 1;
    }

    .controls {
      margin-bottom: 8px;
    }
  `;

  @property({ type: Boolean })
  waiting: boolean = false;

  @state()
  inputText: string = "";

  handleInput({ detail: { value } }: CustomEvent) {
    this.inputText = value;
  }

  handleUndo() {
    socket.send({
      cmd: ClientMessage.UNDO,
      data: this.inputText,
    });
  }

  handleSubmit() {
    socket.send({
      cmd: ClientMessage.SUBMIT,
      allowabort: true,
      actionmode: 0,
      data: this.inputText,
    });

    this.inputText = "";
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="controls">
        <x-icon-button @click=${this.handleUndo} icon="undo"></x-icon-button>
      </div>
      <div class="input">
        <x-text-field
          value=${this.inputText}
          type="text"
          name="text"
          @input=${this.handleInput}
        ></x-text-field>

        <x-icon-button
          icon=${this.waiting ? "spinner" : "corner-down-right"}
          ?disabled=${this.waiting}
          @click=${this.handleSubmit}
        ></x-icon-button>
      </div>
    `;
  }
}
