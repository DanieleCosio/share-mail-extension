import "@webcomponents/custom-elements";
import IconHtml from "./Icon.html";
import ClipboardSvg from "./clipboard.svg";
import CliboardCheckSvg from "./clipboard-check.svg";
import CloseSvg from "./close.svg";
import { BaseComponent } from "../../types.js";

export class Icon extends HTMLElement implements BaseComponent {
    public static name = "sm-icon";
    public iconSvg: string | null;
    public iconElement: Element | null;

    constructor() {
        super();
        this.iconSvg = null;
        this.iconElement = null;
    }

    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = IconHtml;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        this.iconElement = shadow.querySelector(".sm_icon");
        if (!this.iconElement) {
            return;
        }
        if (this.selector) {
            this.iconElement.setAttribute("part", this.selector);
        }

        if (this.icon) {
            const svg = this.iconElement.querySelector("svg");
            if (svg) {
                svg.remove();
            }

            switch (this.icon) {
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
                ?.setAttribute("part", `${this.selector}--svg`);
        }
    }

    get icon(): string {
        return this.getAttribute("icon") || "";
    }

    get selector(): string {
        return this.getAttribute("selector") || "";
    }
}

customElements.define(Icon.name, Icon);
