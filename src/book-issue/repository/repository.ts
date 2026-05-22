import { db } from "../../db";
import type { BookIssue } from "../models/models";

export function getCountByBookId(bookId: number): number | null {
    const stmt = db.prepare<number, number>(
        "SELECT COUNT(*) FROM book_issues WHERE bookId = ?",
    );
    return stmt.get(bookId);
}

export function getCountByMemberId(memberId: number): number | null {
    const stmt = db.prepare<number, number>(
        "SELECT COUNT(*) FROM book_issues WHERE memberId = ?",
    );
    return stmt.get(memberId);
}

export function insertIssue(memberId: number, bookId: number, issueDate: string): void {
    const stmt = db.prepare<BookIssue, [number, number, string]>(
        "INSERT INTO book_issues (memberId, bookId, issueDate) VALUES (?, ?, ?)",
    );

    stmt.run(memberId, bookId, issueDate);
}

export function getByBookIdAndMemberId(memberId: number, bookId: number): BookIssue | null {
    const stmt = db.prepare<BookIssue, [number, number]>(
        "SELECT * FROM book_issues WHERE memberId = ? and bookId = ?",
    );
    return stmt.get(memberId, bookId);
}
