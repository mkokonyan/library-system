import { db } from "../../db";

export function initBookIssueTable(): void {
    db.run(`CREATE TABLE IF NOT EXISTS book_issues
    (
        issueId  INTEGER PRIMARY KEY NOT NULL,
        memberId  INTEGER REFERENCES members(memberId),
        bookId INTEGER REFERENCES books(bookId) UNIQUE,
        issueDate varchar(30) NOT NULL
    )
    `);
}