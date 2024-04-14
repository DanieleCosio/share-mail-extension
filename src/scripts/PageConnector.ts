import { Config } from "../Config";

export class PageConnector {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    static inject(): Promise<any> {
        return new Promise((resolve, reject) => {
            const getData = (event: MessageEvent) => {
                if (
                    event.source !== window ||
                    event.origin !== Config.GMAIL_ORIGIN ||
                    event.data?.type !== Config.EXTENSION_EVENT_TAG
                ) {
                    console.warn("Message from unknown source");
                    return;
                }

                if (event.data) {
                    console.log("Data found!");
                    window.removeEventListener("message", getData);
                    resolve(event.data);
                }

                reject("No data found");
            };

            window.addEventListener("message", getData);

            const scriptUrl = new URL(Config.PAGE_CONNECTOR, Config.BASE_URL);
            const scriptElement = document.createElement("script");
            scriptElement.setAttribute("data-ext", "share-mail-page-connector");
            scriptElement.src = scriptUrl.toString();

            (document.head || document.documentElement).appendChild(
                scriptElement,
            );
        });
    }
}
