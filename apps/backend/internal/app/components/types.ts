export interface BaseComponent {
    readonly selector: string;
}

export type EventCallback = (event: Event) => void;
export type MouseEventCallback = (event: MouseEvent) => void;
