import "@webcomponents/custom-elements";
import ModalHtml from "./Modal.html";
import { BaseComponent } from "../../types.js";
import { loadGlobalStylesheet } from "../../utils";

export class Modal extends HTMLElement implements BaseComponent {
    public static name = "sm-modal";
    modal: HTMLElement | null;

    constructor() {
        super();
        this.isOpen = false;
        this.modal = null;
    }

    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = ModalHtml;

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        loadGlobalStylesheet(shadow);

        this.modal = shadow.querySelector(".sm_modal");
        if (!this.modal) {
            throw Error;
        }

        if (this.selector) {
            this.modal.setAttribute("part", this.selector);
        }

        const closeButton = shadow.querySelector(".sm_modal-close");
        if (!closeButton) {
            throw new Error("Close button not found");
        }

        closeButton.addEventListener("click", () => {
            this.isOpen = false;
        });
    }

    get isOpen(): boolean {
        return !this.modal?.classList.contains("close");
    }

    set isOpen(value: boolean) {
        if (value) {
            this.modal?.classList.remove("close");
            return;
        }

        this.modal?.classList.add("close");
    }

    get selector(): string {
        return this.getAttribute("selector") || "";
    }
}

customElements.define(Modal.name, Modal);
