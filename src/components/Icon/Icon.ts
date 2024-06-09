import "@webcomponents/custom-elements";
import IconHtml from "./Icon.html";
import ClipboardSvg from "./clipboard.svg";
import CliboardCheckSvg from "./clipboard-check.svg";
import CloseSvg from "./close.svg";

class Icon extends HTMLElement {
    iconSvg: string | null;
    iconElement: Element | null;

    constructor() {
        super();
        this.icon = "";
        this.name = "";
        this.iconSvg = null;
        this.iconElement = null;
    }

    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = IconHtml;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        this.iconElement = shadow.querySelector(".sm_icon");
        this.icon = this.getAttribute("icon") || "";
        this.name = this.getAttribute("name") || "";
    }

    get icon(): string {
        return this.icon;
    }

    set icon(value: string) {
        if (!value || !this.iconElement) {
            return;
        }

        const svg = this.iconElement.querySelector("svg");
        if (svg) {
            svg.remove();
        }

        switch (value) {
            case "clipboard":
                this.iconElement.innerHTML = ClipboardSvg;
                break;
            case "clipboard-check":
                this.iconElement.innerHTML = CliboardCheckSvg;
                break;
            case "close":
                this.iconElement.innerHTML = CloseSvg;
                break;
            default:
                break;
        }

        this.iconElement
            .querySelector("svg")
            ?.setAttribute("part", `${this.name}--svg`);
    }

    get name(): string {
        return this.iconElement?.getAttribute("part") ?? "";
    }

    set name(value: string) {
        this.iconElement?.setAttribute("part", value);
        this.iconElement
            ?.querySelector("svg")
            ?.setAttribute("part", `${value}--svg`);
    }

    static get observedAttributes() {
        return ["icon", "name"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) {
            return;
        }

        switch (name) {
            case "icon":
                this.icon = newValue;
                break;
            case "name":
                this.name = newValue;
                break;
            default:
                break;
        }
    }
}

customElements.define("sm-icon", Icon);

export default Icon;
