import React from 'react'
import { SerializedError, EntityId } from '@reduxjs/toolkit'

interface MutableRefObject<T> {
    current: T;
}

type OpenModalFunction = (bookId: EntityId, ref: ElementRef) => void

/**
 * A type for use with useRef hook.
 */
export type ElementRef = MutableRefObject<HTMLElement | undefined> | null

/**
 * BookList component Props.
 */
export interface BookListProps {
    openModal: OpenModalFunction;
}

/**
 * BookListItem component Props.
 */
export interface BookListItemProps {
    id: EntityId;
    openModal: OpenModalFunction;
}

/**
 * Cover component Props.
 */
export interface CoverProps {
    coverId: string;
    title: string;
}

/**
 * LoadingIndicator component Props.
 */
export interface LoadingIndicatorProps {
    color: string | undefined;
}

/**
 * ModalView component Props.
 */
export interface ModalViewProps {
    id: EntityId;
    closeModal: () => void;
    accessible: ElementRef;
}

/**
 * BookDetails component Props.
 */
export interface BookDetailsProps {
    book: Book;
    elementToFocusRef: ElementRef;
}

/**
 * PaginationButton component Props.
 */
export interface PaginationButton {
    onClick: (() => void) | undefined;
    children: React.ReactNode;
}

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
    author_name: [string];
    key: string;
    first_publish_year: number;
    cover_i: string;
    isbn: string;
    edition_count: number;
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