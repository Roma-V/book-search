interface MutableRefObject<T> {
    current: T;
}

export type elementRef = MutableRefObject<HTMLElement> | null