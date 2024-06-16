import { Config } from "./Config";
import { EventAction } from "./enums";

/*
 * GetEmailBodyMessage
 */
export type GetEmailBodyMessage = {
    type: typeof Config.EXTENSION_EVENT_TAG;
    action: typeof EventAction.GET_BODY;
    params: {
        currentUrl: Location | undefined;
        emailId: string;
        ik: string;
        request: {
            method: "GET";
        };
    };
};
export const getEmailBodyMessage: GetEmailBodyMessage = {
    type: Config.EXTENSION_EVENT_TAG,
    action: EventAction.GET_BODY,
    params: {
        currentUrl: undefined,
        emailId: "",
        ik: "",
        request: {
            method: "GET",
        },
    },
} as const;
Object.freeze(getEmailBodyMessage);

/*
 * EmailBodyLinkMessage
 */
export type EmailLinkMessage = {
    type: typeof Config.EXTENSION_EVENT_TAG;
    action: typeof EventAction.GET_LINK;
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
export const emailLinkMessage: EmailLinkMessage = {
    type: Config.EXTENSION_EVENT_TAG,
    action: EventAction.GET_LINK,
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
Object.freeze(emailLinkMessage);

export type EmailLinkResponse = {
    data: {
        url: string;
        expire_at: string;
    };
};

export type Attachment = {
    name: string;
    url: string;
    size: string;
    mimeType: string;
    preview: string;
};
