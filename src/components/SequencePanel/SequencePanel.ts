import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "../../style/styles";
import { ServerMessage } from "../../utils/messages";
import { socket } from "../../utils/socket";
import { Sequence } from "./types";

@customElement("x-sequence-panel")
export class SequencePanel extends LitElement {
  static styles = [
    ...globalStyles,
    css`
      .sequence-panel {
        background-color: var(--color-slate-100);
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-radius: 12px;
      }

      .sequence {
        background-color: var(--color-slate-200);
        padding: 8px;
        border-radius: 12px;
      }
    `,
  ];

  @state()
  sequences: Sequence[] = [];

  constructor() {
    super();

    socket.on("from_server", ({ cmd, data }) => {
      switch (cmd) {
        case ServerMessage.GENERATE_SEQUENCES:
          this.generateSequences(data);
      }
    });
  }

  generateSequences(sequences: string[][]) {
    this.sequences = sequences.map(
      (sequence) =>
        ({
          content: sequence[0][0],
          type: sequence[0][1],
        } as Sequence)
    );
  }

  render() {
    if (this.sequences.length > 0) {
      return html`<div class="sequence-panel">
        ${this.sequences.map(
          (sequence) => html`
            <div class="sequence">
              <p>${sequence.content}</p>
            </div>
          `
        )}
      </div>`;
    }
  }
}
