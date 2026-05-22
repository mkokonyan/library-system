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
