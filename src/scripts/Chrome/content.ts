import { PageConnector } from "../PageConnector";
import { GmailService } from "../GmailService";

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
let GLOBALS: any;

(async () => {
    await GmailService.waitGmailUI();
    GLOBALS = await PageConnector.inject();
    GmailService.tryInjectBtn(GLOBALS.data[10] as string);

    window.addEventListener("hashchange", () => {
        setTimeout(() => {
            GmailService.tryInjectBtn(GLOBALS.data[10] as string);
        }, 1000);
    });

    console.log("Share mail extension started");
})();
