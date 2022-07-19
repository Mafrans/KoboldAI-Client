import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { globalStyles } from "../../style/styles";
import { ClientMessage } from "../../utils/messages";
import { socket } from "../../utils/socket";

import "../IconButton/IconButton";
import "../TextField/TextField";

@customElement("x-control-panel")
export class ControlPanel extends LitElement {
  static styles = [
    ...globalStyles,
    css`
      .input {
        display: flex;
        gap: 16px;
      }

      .input x-text-field {
        flex: 1;
      }

      .controls {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
      }
    `,
  ];

  @property({ type: Boolean })
  waiting: boolean = false;

  @state()
  inputText: string = "";

  @state()
  undoCount: number = 0;

  handleInput({ detail: { value } }: CustomEvent) {
    this.inputText = value;
  }

  handleUndo() {
    socket.send({
      cmd: ClientMessage.UNDO,
    });

    this.undoCount++;
  }

  handleRedo() {
    socket.send({
      cmd: ClientMessage.REDO,
    });

    this.undoCount--;
  }

  submitContent(content: string) {
    socket.send({
      cmd: ClientMessage.SUBMIT,
      allowabort: true,
      actionmode: 0,
      data: content,
    });

    this.inputText = "";
    this.undoCount = 0;
    this.requestUpdate();
  }

  handleSubmit() {
    this.submitContent(this.inputText);
  }

  render() {
    return html`
      <div class="controls">
        <x-icon-button @click=${this.handleUndo} icon="undo"></x-icon-button>
        <x-icon-button
          @click=${this.handleRedo}
          ?disabled=${this.undoCount <= 0}
          icon="redo"
        ></x-icon-button>
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
