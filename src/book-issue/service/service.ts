import type { BookIssueDetails, IssueErrorResponse, IssueRequest, IssueResponse } from "../models/models";
import { deleteById, getActiveByMemberId, getAllWithDetails, getByBookIdAndMemberId, getCountByBookId, getCountByMemberId, insertIssue } from "../repository/repository";
import { findById as findMemberById } from "../../member/repository/repository";
import { findBookById } from "../../book/service/service";

export function getAllIssues(): BookIssueDetails[] {
    return getAllWithDetails();
}

export function getMemberActiveIssues(memberId: number): BookIssueDetails[] | null {
    if (!findMemberById(memberId)) {
        return null;
    }

    return getActiveByMemberId(memberId);
}

export function returnIssue(issueId: number): boolean {
    try {
        return deleteById(issueId);
    } catch {
        return false;
    }
}

export function saveIssue({ memberId, bookId }: IssueRequest): IssueResponse | IssueErrorResponse {
    const member = findMemberById(memberId);
    if (!member) {
        return {
            success: false,
            error: 'There is no member with this id.'
        };
    }

    const book = findBookById(bookId);
    if (!book) {
        return {
            success: false,
            error: 'There is no book with this id.'
        };
    }

    const countBooksIssued = getCountByBookId(bookId);
    if (countBooksIssued && countBooksIssued !== 0) {
        return {
            success: false,
            error: 'Book is already issued to another member.'
        };
    }

    const countMemberIssues = getCountByMemberId(memberId);
    if (countMemberIssues && countMemberIssues >= 3) {
        return {
            success: false,
            error: 'Member cannot issue more than 3 books.'
        };
    }
    
    const issueDate = new Date().toISOString();
    insertIssue(memberId, bookId, issueDate)
    const bookIssue = getByBookIdAndMemberId(memberId, bookId)
    if (!bookIssue) {
        return {
            success: false,
            error: 'No issue for this book for this member.'
        };
    }
    
    return {
        success: true,
        message: 'Book issued successfully.',
        issue: bookIssue
    };
}