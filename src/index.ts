function tryInjectBtn() {
    const actionsContainer = document.querySelector("div.hj");
    if (!actionsContainer) {
        console.log("No actions container found");
        return;
    }

    const existingButton = actionsContainer.querySelector(
        "button[sm-xt-data='get-link']"
    );
    if (existingButton) {
        console.log("Button already exists");
        return;
    }

    const button = document.createElement("button");
    button.innerText = "Get link";
    button.addEventListener("click", () => {
        const mail = getMailBody();
        if (!mail) {
            alert("Mail not found");
            return;
        }

        getMailLink(mail);
    });

    button.setAttribute("sm-xt-data", "get-link");

    actionsContainer.firstChild?.appendChild(button);
    console.log("Done");
}

function getMailLink(mail: Element) {
    // TODO Make request to backend and get the link
    alert("Link: https://google.com");
}

function waitGmailUI(timeout: number = 3500, interval: number = 200) {
    const stopTime = Date.now() + timeout;
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

function getMailBody(): Element | null {
    const email = document.querySelector("div.a3s div[dir='ltr']");
    if (!email) {
        return null;
    }

    return email;
}

async function init() {
    await waitGmailUI();
    tryInjectBtn();
    window.addEventListener("hashchange", () => {
        setTimeout(() => {
            tryInjectBtn();
        }, 1000);
    });
}

console.log("Share mail extension started");
init();
