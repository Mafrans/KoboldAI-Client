import { css, unsafeCSS } from "lit";
import "./theme.css";

// @ts-ignore next-line
import normalize from "normalize.css/normalize.css?raw";

export const globalStyles = [
  unsafeCSS(normalize),
  css`
    * {
      font-family: "Inter", sans-serif;
      box-sizing: "border-box";
    }
  `,
];

console.log(globalStyles);
