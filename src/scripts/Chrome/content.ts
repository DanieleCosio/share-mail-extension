import { PageConnector } from "../PageConnector";
import { GmailService } from "../GmailService";
/* import { UI } from "../UI"; */

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
let GLOBALS: any;

(async () => {
    //Components.load();
    await GmailService.waitGmailUI();

    GLOBALS = await PageConnector.inject();

    const accountOwnerEmail = GLOBALS.data[10] as string;
    const ik = GLOBALS.data[9] as string;
    GmailService.tryInjectBtn(accountOwnerEmail, ik);

    window.addEventListener("hashchange", () => {
        setTimeout(() => {
            GmailService.tryInjectBtn(accountOwnerEmail, ik);
        }, 1000);
    });

    console.log("Share mail extension started");
})();
