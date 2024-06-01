export function pageHtmlToElement(html: string): HTMLElement {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, "text/html");
    return doc.body;
}
