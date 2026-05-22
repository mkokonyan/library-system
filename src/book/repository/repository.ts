import { db } from "../../db";
import type { Book } from "../models/models";

export function getAll(): Book[] {
    return db.prepare<Book, []>(
        'SELECT * FROM books'
    ).all();
}

export function create(book: Book): void {
    const { title, subject, author, language } = book;

    const stmt = db.prepare<Book, [string, string, string, string]>(
        "INSERT INTO books (title, subject, author, language) VALUES (?, ?, ?, ?)",
    );

    stmt.run(title, subject, author, language);
}

export function findById(bookid: number): Book | null {
    const stmt = db.prepare<Book, number>(
        "SELECT * FROM books WHERE bookid = ?",
    );
    return stmt.get(bookid);
}



