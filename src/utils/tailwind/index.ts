import { unsafeCSS } from "lit";
import style from "./style.css?inline";

// Provide Tailwind as global utilities to be used within Shadow-DOM components
export const _tailwind = unsafeCSS(style);
