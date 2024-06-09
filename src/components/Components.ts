import globalCss from "./globals.css";
import "./Btn/Btn";
import "./Loader/Loader";
import "./Modal/Modal";
import "./Icon/Icon";

export class Components {
    static load() {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<style>${globalCss}</style>`,
        );
    }
}
