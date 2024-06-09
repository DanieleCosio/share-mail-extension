import "@webcomponents/custom-elements";
import LoaderHtml from "./Loader.html";

class Loader extends HTMLElement {
    loader: HTMLElement | null;

    constructor() {
        super();

        this.active = true;
        this.loader = null;
    }

    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = LoaderHtml;

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        this.loader = shadow.querySelector(".sm_loader");
        this.active = this.getAttribute("active") === "true";
    }

    get active(): boolean {
        return this.loader?.classList.contains("active") ?? false;
    }

    set active(value: boolean) {
        if (value) {
            this.loader?.classList.add("active");
            return;
        }

        this.loader?.classList.remove("active");
    }

    static get observedAttributes() {
        return ["active"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) {
            return;
        }

        switch (name) {
            case "active":
                this.active = newValue === "true";
                break;
            default:
                break;
        }
    }
}

customElements.define("sm-loader", Loader);

export default Loader;
