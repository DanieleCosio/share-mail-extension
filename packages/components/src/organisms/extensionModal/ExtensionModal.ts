import "@webcomponents/custom-elements";
import ExtensionModalHtml from "./extension-modal.html";
import Modal from "../../molecules/modal/Modal.js";
import { loadGlobalStylesheet } from "../../utils";

class ExtensionModal extends HTMLElement {
    public static name = "sm-extension-modal";
    modalRef: Modal | null;
    loader: HTMLElement | null;
    clearEventListener: () => void;

    constructor() {
        super();
        this.modalRef = null;
        this.loader = null;
        this.emailUrl = "";
        this.expirationDate = "";
        this.password = "";
        this.useAttachments = false;
        this.clearEventListener = () => {
            this.emailUrl = "";
            this.expirationDate = "";
            this.useAttachments = false;
            this.isLoading = false;
        };
    }

    connectedCallback() {
        const template = document.createElement("template");
        template.innerHTML = ExtensionModalHtml;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        loadGlobalStylesheet(shadow);

        if (!this.shadowRoot) {
            throw new Error("sm-extension-modal: shadowRoot not found.");
        }

        this.loader = this.shadowRoot.querySelector("sm-loader");
        this.modalRef = this.shadowRoot.querySelector("sm-modal") as Modal;

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

        window.addEventListener("hashchange", this.clearEventListener);
    }

    disconnectedCallback() {
        this.removeEventListener("hashchange", this.clearEventListener);
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
        return this?.querySelector("a")?.getAttribute("href") ?? "";
    }

    set emailUrl(value: string) {
        const emailLink = this?.querySelector("a");
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
        return this?.querySelector("time")?.textContent ?? "";
    }

    set expirationDate(value: string) {
        const time = this?.querySelector("time");
        if (!time) {
            return;
        }

        if (!value) {
            time.textContent = "";
            time.removeAttribute("datetime");
            return;
        }

        time.textContent = `Expiration date: ${value}`;
        time.setAttribute("datetime", value);
    }

    get useAttachments(): boolean {
        return (
            (this?.querySelector("input[type=checkbox]") as HTMLInputElement)
                ?.checked ?? false
        );
    }

    set useAttachments(value: boolean) {
        const checkbox = this?.querySelector("input[type=checkbox]");
        if (!checkbox) {
            return;
        }

        (checkbox as HTMLInputElement).checked = value;
    }

    get password(): string {
        return this.password;
    }

    set password(value: string) {
        const passwordValueElement = this?.querySelector(
            ".sm_link-password>.value",
        );

        if (!passwordValueElement) {
            return;
        }

        if (
            !value &&
            !passwordValueElement?.parentElement?.classList.contains("hidden")
        ) {
            passwordValueElement?.classList.add("hidden");
            return;
        }

        passwordValueElement.textContent = value;
        passwordValueElement.parentElement?.classList.remove("hidden");
    }

    get isOpen(): boolean {
        return this.modalRef?.isOpen || false;
    }

    set isOpen(value: boolean) {
        if (!this.modalRef) {
            return;
        }

        this.modalRef.isOpen = value;
    }
}

customElements.define(ExtensionModal.name, ExtensionModal);

export default ExtensionModal;
