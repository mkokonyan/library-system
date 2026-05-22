import { findBookById } from "../../book/service/service";
import { findMemberById } from "../../member/service/service";
import type { BookIssue, IssueErrorResponse, IssueRequest, IssueResponse } from "../models/models";
import { getByBookIdAndMemberId, getCountByBookId, getCountByMemberId, insertIssue } from "../repository/repository";

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