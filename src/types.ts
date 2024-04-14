import { Config } from "./Config";
import { EventAction } from "./enums";

/*
 * EmailBodyLinkMessage
 */
export type EmailBodyLinkMessage = {
    type: typeof Config.EXTENSION_EVENT_TAG;
    action: typeof EventAction.SEND_REQUEST;
    params: {
        url: string;
        request: {
            method: "POST";
            headers: {
                Accept: "application/json";
                "Content-Type": "application/json";
            };

            body: string;
        };
    };
};

export const emailBodyLinkMessage: EmailBodyLinkMessage = {
    type: Config.EXTENSION_EVENT_TAG,
    action: EventAction.SEND_REQUEST,
    params: {
        url: "",
        request: {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: "",
        },
    },
} as const;
Object.freeze(emailBodyLinkMessage);
