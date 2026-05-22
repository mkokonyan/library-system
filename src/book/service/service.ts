import type { Book } from "../models/models";
import { getAll, create, findById } from "../repository/repository";

export function getAllBooks(): Book[] {
    return getAll();
}

export function createBook(book: Book): boolean {
    try {
        create(book);
        return true;
    } catch (error) {
        return false;
    }
}

export function findBookById(bookId: number): Book | null {
    return findById(bookId);
}

