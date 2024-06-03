import Btn from "../components/Btn/Btn";
import Modal from "../components/Modal/Modal";
import { Config } from "../Config";
import {
    emailLinkMessage,
    EmailLinkMessage,
    getEmailBodyMessage,
    GetEmailBodyMessage,
} from "../types";
import { pageHtmlToElement } from "./utils";
import { decode } from "quoted-printable";

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

    static tryInjectBtn(accountOwnerEmail: string, ik: string) {
        let modal = document.querySelector("sm-modal");
        if (!modal) {
            document.body.style.position = "relative";
            modal = new Modal();
            document.body.appendChild(modal);

            // Not the best ergonomics, but it works
            const getLinkButton = modal.shadowRoot
                ?.querySelector("sm-btn")
                ?.shadowRoot?.querySelector("button");

            if (getLinkButton) {
                getLinkButton.addEventListener("click", async () => {
                    const mail = await GmailService.getMailBody(ik);
                    if (!mail) {
                        alert("Mail not found");
                        return;
                    }

                    GmailService.getMailLink(mail, accountOwnerEmail);
                    console.log("Mail link received");
                });
            }
        }

        const actionsContainer = document.querySelector("div.hj");
        if (!actionsContainer) {
            console.log("No actions container found");
            return;
        }

        const existingButton = actionsContainer.querySelector("sm-button");
        if (existingButton) {
            console.log("Button already exists");
            return;
        }

        const button = new Btn();
        button.text = "Get link";
        button.addEventListener("click", () => {
            (modal as Modal).isOpen = true;
        });

        actionsContainer.firstChild?.appendChild(button);
        console.log("Done");
    }

    static async getMailBody(ik: string): Promise<Element | null> {
        const emailId = document
            .querySelector("h2[data-thread-perm-id]")
            ?.getAttribute("data-thread-perm-id")
            ?.replace("thread-", "msg-");
        if (!emailId) {
            console.warn("Email ID not found");
            return null;
        }

        const message: GetEmailBodyMessage = { ...getEmailBodyMessage };
        message.params.currentUrl = location;
        message.params.ik = ik;
        message.params.emailId = emailId;
        const onResponseReceived = new Promise<{ data: string }>(
            (resolve, reject) => {
                chrome.runtime.sendMessage(message, (response) => {
                    console.log("Response received", response);
                    resolve(response);
                });
            },
        );

        const pageHtmlString = (await onResponseReceived)?.data;
        const originalSourcePage = pageHtmlToElement(pageHtmlString);
        const emailBodyFullString =
            originalSourcePage.querySelector("pre")?.innerText;
        if (!emailBodyFullString) {
            console.warn("Email body not found");
            return null;
        }

        const emailBodyMatch =
            Config.EMAIL_BODY_MATCH_PATTERN.exec(emailBodyFullString);
        if (!emailBodyMatch) {
            console.warn("Email body not found");
            return null;
        }

        const emailHtmlString = decode(emailBodyMatch[0]);
        return pageHtmlToElement(emailHtmlString);
    }

    static async getMailLink(mailElement: Element, email: string) {
        const url = new URL(Config.GET_LINK, Config.BASE_URL);
        const message: EmailLinkMessage = { ...emailLinkMessage };
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
