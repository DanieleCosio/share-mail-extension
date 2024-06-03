import "@webcomponents/custom-elements";
import ModalHtml from "./Modal.html";

class Modal extends HTMLElement {
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

        this.modal = shadow.querySelector(".sm_modal");

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
}

customElements.define("sm-modal", Modal);

export default Modal;
