import "@webcomponents/custom-elements";
import ModalHtml from "./Modal.html";

class Modal extends HTMLElement {
    modal: HTMLElement | null;
    loader: HTMLElement | null;

    constructor() {
        super();
        this.isOpen = false;
        this.isLoading = true;
        this.modal = null;
        this.loader = null;
        this.emailUrl = "";
        this.expirationDate = "";
        this.useAttachments = false;
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

        this.loader = shadow.querySelector("sm-loader");

        const clipboadButton = shadow.querySelector(".sm_copy-to-clipboard");
        if (!clipboadButton) {
            throw new Error("Clipboard button not found");
        }

        clipboadButton.addEventListener("click", async (event) => {
            const icon = (event.currentTarget as Element)?.querySelector(
                "sm-icon",
            );
            const text = clipboadButton.parentElement?.querySelector("a")?.href;
            await navigator.clipboard.writeText(text ?? "");
            icon?.setAttribute("icon", "clipboard-check");
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

    get isLoading(): boolean {
        return this.loader?.getAttribute("active") === "true";
    }

    set isLoading(value: boolean) {
        if (value) {
            this.loader?.setAttribute("active", "true");
            return;
        }

        this.loader?.setAttribute("active", "false");
    }

    get emailUrl(): string {
        return this.modal?.querySelector("a")?.getAttribute("href") ?? "";
    }

    set emailUrl(value: string) {
        const emailLink = this.modal?.querySelector("a");
        if (!emailLink) {
            return;
        }

        emailLink.setAttribute("href", value);
        emailLink.textContent = value;

        if (!value) {
            return;
        }

        emailLink.parentElement?.parentElement
            ?.querySelector(".sm_copy-to-clipboard")
            ?.classList.remove("hidden");
    }

    get expirationDate(): string {
        return this.modal?.querySelector("time")?.textContent ?? "";
    }

    set expirationDate(value: string) {
        const time = this.modal?.querySelector("time");
        if (!time) {
            return;
        }

        time.textContent = `Expiration date: ${value}`;
        time.setAttribute("datetime", value);
    }

    get useAttachments(): boolean {
        return (
            (
                this.modal?.querySelector(
                    "input[type=checkbox]",
                ) as HTMLInputElement
            )?.checked ?? false
        );
    }

    set useAttachments(value: boolean) {
        const checkbox = this.modal?.querySelector("input[type=checkbox]");
        if (!checkbox) {
            return;
        }

        (checkbox as HTMLInputElement).checked = value;
    }
}

customElements.define("sm-modal", Modal);

export default Modal;
