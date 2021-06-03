import { SerializedError } from '@reduxjs/toolkit'

interface MutableRefObject<T> {
    current: T;
}

/**
 * A type for use with useRef hook.
 */
export type ElementRef = MutableRefObject<HTMLElement> | null

/**
 * An object with parameters used in a thunk fetching search results.
 */
export interface SearchParameters {
    query: string,
    searchParameter: string,
    page: number
}

/**
 * A book as fetched form OpenLibrary.
 */
export interface Book {
    id: string;
    title: string;
    key: string;
    first_publish_year: number;
}

/**
 * Redux state slice for Books.
 */
export interface BooksState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | Error | SerializedError;
    meta: null | {
        query?: Omit<SearchParameters, 'page'>;
        numFound?: number;
        start?: number;
    }
}

/**
 * Fetch action payload.
 */
export interface FetchPayload {
    numFound: number;
    start: number;
    docs: [Book];
    num_found: number;
}