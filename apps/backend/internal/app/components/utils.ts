import { EventCallback } from "./types";

export function getSsrCallback(value: string): EventCallback | null {
    const callback = (window as never)[value];
    if (!callback) {
        return null;
    }

    return callback;
}
