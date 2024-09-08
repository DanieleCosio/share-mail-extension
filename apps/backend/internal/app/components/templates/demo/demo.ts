import Modal from "../../molecules/modal/Modal";
import ExtensionModal from "../../organisms/extensionModal/extensionModal";

export function demoClickCallback(event: MouseEvent) {
    const modal = document.querySelector("sm-modal");
    if (!modal) {
        return;
    }

    (modal as Modal).isOpen = true;
}

export function demoClickCallback2(event: MouseEvent) {
    const modal = document.querySelector(`sm-extension-modal`);
    if (!modal) {
        return;
    }

    (modal as ExtensionModal).isOpen = true;
}
