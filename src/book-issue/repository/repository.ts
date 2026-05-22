import { db } from "../../db";
import { findById as findBookById } from "../../book/repository/repository";
import { findById as findMemberById } from "../../member/repository/repository";
import type { BookIssue, BookIssueDetails } from "../models/models";


function toDetails(issue: BookIssue): BookIssueDetails {
    return {
        issueId: issue.issueId,
        issueDate: issue.issueDate,
        member: findMemberById(issue.memberId)!,
        book: findBookById(issue.bookId)!,
    };
}

export function getAllWithDetails(): BookIssueDetails[] {
    const issues = db.prepare<BookIssue, []>(
        "SELECT * FROM book_issues ORDER BY issueId",
    ).all();

    return issues.map(toDetails);
}

export function getActiveByMemberId(memberId: number): BookIssueDetails[] {
    const issues = db.prepare<BookIssue, [number]>(
        "SELECT * FROM book_issues WHERE memberId = ? ORDER BY issueId",
    ).all(memberId);

    return issues.map(toDetails);
}

export function deleteById(issueId: number): boolean {
    const result = db.prepare("DELETE FROM book_issues WHERE issueId = ?").run(issueId);
    return result.changes > 0;
}

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
