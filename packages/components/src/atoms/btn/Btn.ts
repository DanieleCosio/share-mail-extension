import "@webcomponents/custom-elements";
import BtnHtml from "./Btn.html";
import { BaseComponent, MouseEventCallback } from "../../types.js";
import { getSsrCallback, loadGlobalStylesheet } from "../../utils.js";

class Btn extends HTMLElement implements BaseComponent {
    private buttonElement: HTMLButtonElement | undefined | null;
    public static name = "sm-btn";

    constructor() {
        super();
        console.debug("sm-button constructor executed...");
    }

    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = BtnHtml;

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        loadGlobalStylesheet(shadow);

        this.buttonElement = shadow.querySelector("button");
        if (!this.buttonElement) {
            throw new Error("Button not found");
        }

        if (this.onClickCallbackString) {
            const callback = getSsrCallback(
                this.onClickCallbackString,
            ) as MouseEventCallback;

            if (callback === null) {
                console.debug("Error: ");
                console.debug("Element: ", this.buttonElement);
                console.debug("Callback: ", callback);
                return;
            }

            this.buttonElement.addEventListener("click", callback);
        }

        if (this.selector) {
            this.buttonElement.setAttribute("part", this.selector);
        }
    }

    get selector(): string {
        return this.getAttribute("selector") || "";
    }

    get onClickCallbackString(): string {
        return this.getAttribute("click") || "";
    }
}

customElements.define(Btn.name, Btn);

export default Btn;
