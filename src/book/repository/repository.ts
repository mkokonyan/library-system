import type { Book } from "../models/models";
import { db } from "../../../index";

export function getAll(): Book[] {
    return db.prepare<Book, []>(
        'Select * from BOOKS'
    ).all();
}