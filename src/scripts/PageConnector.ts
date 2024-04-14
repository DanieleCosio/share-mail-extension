import { Config } from "../Config";

const EVENT_TYPE: string = "extension-share-mail";
export class PageConnector {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    static inject(): Promise<any> {
        return new Promise((resolve, reject) => {
            const getData = (event: MessageEvent) => {
                if (
                    event.source !== window ||
                    event.origin !== window.location.origin ||
                    event.data?.type !== EVENT_TYPE
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
