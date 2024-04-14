import { Config } from "../Config";
import { emailBodyLinkMessage, EmailBodyLinkMessage } from "../types";

export class GmailService {
    static waitGmailUI(
        timeout: number = 3500,
        interval: number = 200,
    ): Promise<boolean> {
        const stopTime = Date.now() + timeout;
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        const checkCondition = (resolve: any, reject: any) => {
            const mailsContainer = document.querySelector("div[role='main']");
            if (!mailsContainer && Date.now() < stopTime) {
                setTimeout(checkCondition, interval, resolve, reject);
                return;
            }

            const mails = mailsContainer?.getElementsByTagName("tr");
            if (!mails?.length && Date.now() < stopTime) {
                setTimeout(checkCondition, interval, resolve, reject);
                return;
            }

            if (Date.now() >= stopTime) {
                reject(false);
                return;
            }

            resolve(true);
        };

        return new Promise<boolean>(checkCondition);
    }

    static tryInjectBtn(accountOwnerEmail: string) {
        const actionsContainer = document.querySelector("div.hj");
        if (!actionsContainer) {
            console.log("No actions container found");
            return;
        }

        const existingButton = actionsContainer.querySelector(
            "button[sm-xt-data='get-link']",
        );
        if (existingButton) {
            console.log("Button already exists");
            return;
        }

        const button = document.createElement("button");
        button.innerText = "Get link";
        button.addEventListener("click", () => {
            const mail = GmailService.getMailBody();
            if (!mail) {
                alert("Mail not found");
                return;
            }

            GmailService.getMailLink(
                mail,
                accountOwnerEmail /* GLOBALS.data[10] as string */,
            );
        });

        button.setAttribute("sm-xt-data", "get-link");

        actionsContainer.firstChild?.appendChild(button);
        console.log("Done");
    }

    static getMailBody(): Element | null {
        const email = document.querySelector("div.a3s > div");
        if (!email) {
            return null;
        }

        return email;
    }

    static async getMailLink(mailElement: Element, email: string) {
        const url = new URL(Config.GET_LINK, Config.BASE_URL);
        const message: EmailBodyLinkMessage = { ...emailBodyLinkMessage };
        message.params.url = url.toString();
        message.params.request.body = JSON.stringify({
            requestAccountOwner: email,
            messageHtml: mailElement.innerHTML,
        });

        chrome.runtime.sendMessage(message, (response) => {
            console.log("Response received", response);
            alert(response);
        });
    }
}
