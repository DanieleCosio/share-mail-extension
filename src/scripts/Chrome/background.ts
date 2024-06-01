import { Config } from "../../Config";
import { EventAction } from "../../enums";
import { EmailLinkMessage, GetEmailBodyMessage } from "../../types";

chrome.runtime.onMessage.addListener(
    (message: EmailLinkMessage | GetEmailBodyMessage, sender, sendResponse) => {
        if (
            sender.origin !== Config.GMAIL_ORIGIN ||
            message.type !== Config.EXTENSION_EVENT_TAG
        ) {
            console.warn("Message from unknown source");
            return true;
        }

        switch (message.action) {
            case EventAction.GET_LINK: {
                // chrome.runtime.onMessage.addListener don't like async functions as callback so this workaround need to be done
                (async () => {
                    return await (
                        await fetch(message.params.url, message.params.request)
                    )?.json();
                })().then((data) => sendResponse({ data }));

                break;
            }
            case EventAction.GET_BODY: {
                if (!message.params.currentUrl) {
                    console.warn("No current URL");
                    break;
                }

                const url = new URL(
                    message.params.currentUrl.pathname,
                    message.params.currentUrl.origin,
                );

                url.searchParams.append("ik", message.params.ik);
                url.searchParams.append("view", "om");
                url.searchParams.append("permmsgid", message.params.emailId);
                console.log("URL", url.toString());

                // chrome.runtime.onMessage.addListener don't like async functions as callback so this workaround need to be done
                (async () => {
                    return await (
                        await fetch(url, message.params.request)
                    )?.text();
                })().then((data) => sendResponse({ data }));

                break;
            }
            default:
                console.warn("Unknown action");
                break;
        }

        return true;
    },
);
