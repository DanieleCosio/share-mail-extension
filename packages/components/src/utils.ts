import globalStylesheet from "./styles.css";
import { EventCallback } from "./types.js";

export function loadGlobalStylesheet(shadow: ShadowRoot): void {
    const stylesheet = new CSSStyleSheet();
    stylesheet.replace(globalStylesheet);
    shadow.adoptedStyleSheets.push(stylesheet);
}

export function getSsrCallback(value: string): EventCallback | null {
    const callback = (window as never)[value];
    if (!callback) {
        return null;
    }

    return callback;
}
