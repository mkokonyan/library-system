export interface IssueRequest {
    memberId: number,
    bookId: number,
}

export interface BookIssue {
    issueId: number,
    memberId: number,
    bookId: number,
    issueDate: string,
}

export interface IssueResponse {
    success: boolean,
    message: string,
    issue: BookIssue,
}

export interface IssueErrorResponse {
    success: boolean,
    error: string,
}