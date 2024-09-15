import * as components from "@share-mail/components";

declare global {
    interface Window {
        components: typeof components;
    }
}

window.components = components;
