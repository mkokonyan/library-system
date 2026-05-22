import { db } from "../../db";
import type { Book } from "../models/models";

export function getAll(): Book[] {
    return db.prepare<Book, []>(
        'Select * from BOOKS'
    ).all();
}