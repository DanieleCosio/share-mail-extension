import globalCss from "./globals.css";

export class Components {
    static load() {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<style>${globalCss}</style>`,
        );
    }
}
