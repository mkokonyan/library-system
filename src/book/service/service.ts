import type { Book } from "../models/models";
import { getAll } from "../repository/repository";

export function getAllBooks(): Book[] {
    return getAll();
}

export function createBook(book: Book): Book {
    // return create();
}

