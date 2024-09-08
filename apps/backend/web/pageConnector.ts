// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let GLOBALS: any;

const EVENT_TYPE = "extension-share-mail";
window.postMessage({ type: `${EVENT_TYPE}`, data: GLOBALS });
document
    .querySelector("script[data-ext='share-mail-page-connector']")
    ?.remove();
