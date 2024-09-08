import { demoClickCallback, demoClickCallback2 } from "./templates/demo/demo";
import { MouseEventCallback } from "./types";

/* GLOBAL FUNCTIONS */
declare global {
    interface Window {
        demoClickCallback: MouseEventCallback;
        demoClickCallback2: MouseEventCallback;
    }
}

window.demoClickCallback = demoClickCallback;
window.demoClickCallback2 = demoClickCallback2;
