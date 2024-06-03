import "@webcomponents/custom-elements";
import BtnHtml from "./Btn.html";

class Btn extends HTMLElement {
    constructor() {
        super();
        this.text = this.getAttribute("text") || "";
    }

    get text(): string {
        return this.getAttribute("text") || "";
    }

    set text(value: string) {
        this.setAttribute("text", value);
    }

    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = BtnHtml;

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        const button = shadow.querySelector("button");
        if (!button) {
            throw new Error("Button not found");
        }

        button.textContent = this.text;
    }

    static get observedAttributes() {
        return ["text"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) {
            return;
        }

        switch (name) {
            case "text":
                this.text = newValue;
                break;
            default:
                break;
        }
    }
}

customElements.define("sm-btn", Btn, { extends: "button" });

export default Btn;
