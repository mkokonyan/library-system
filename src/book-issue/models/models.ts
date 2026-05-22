import type { Book } from "../../book/models/models";
import type { Member } from "../../member/models/models";

export interface BookIssue {
    issueId: number;
    memberId: number;
    bookId: number;
    issueDate: string;
}

export interface BookIssueDetails {
    issueId: number;
    issueDate: string;
    member: Member;
    book: Book;
}
