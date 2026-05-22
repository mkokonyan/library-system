import { Elysia } from "elysia";
import { initBookTable } from './src/book/repository/init';
import { createBook, findBookById, getAllBooks } from "./src/book/service/service";
import { bookIdParamValidation, bookValidation } from "./src/book/models/validation";
import type { Book } from "./src/book/models/models";
import { createMember, findMemberById, getAllMembers } from "./src/member/service/service";
import type { Member } from "./src/member/models/models";
import { memberIdParamValidation, memberValidation } from "./src/member/models/validation";
import { initMemberTable } from "./src/member/repository/init";
import { initBookIssueTable } from "./src/book-issue/repository/init";

initTables();

const port: number = 3001;
const app: Elysia = new Elysia().listen(port);

app.group('/books', (app) =>
    app.get('', ({ set }) => {
        const allBooks = getAllBooks();
        set.status = 200;
        return allBooks;
    })
        .post('', ({ body, set }) => {
            const newBook = body as Book;
            const successful = createBook(newBook);
            if (!successful) {
                set.status = 400;
                return { message: 'Book creation failed' };
            }
            set.status = 201;
            return { message: 'Book created successfully!' };
        }, bookValidation)
        .get('/:bookId', ({ set, params: { bookId } }) => {
            const book = findBookById(bookId);
            if (!book) {
                set.status = 404;
                return { message: 'Book not found' };
            }
            set.status = 201;
            return book;
        }, bookIdParamValidation)
);

app.group('/members', (app) =>
    app.get('', ({ set }) => {
        const allMembers = getAllMembers();
        set.status = 200;
        return allMembers;
    })
        .post('', ({ body, set }) => {
            const newMember = body as Member;
            const successful = createMember(newMember);
            if (!successful) {
                set.status = 400;
                return { message: 'Member creation failed' };
            }
            set.status = 201;
            return { message: 'Member created successfully!' };
        }, memberValidation)
        .get('/:memberid', ({ set, params: { memberid } }) => {
            const member = findMemberById(memberid);
            if (!member) {
                set.status = 404;
                return { message: 'Member not found' };
            }
            set.status = 201;
            return member;
        }, memberIdParamValidation)
);

const hostname: string | undefined = app.server?.hostname;
const serverPort: number | undefined = app.server?.port;

console.log(`Server running at ${hostname}:${serverPort}`);

function initTables(): void {
  initBookTable();
  initMemberTable();
  initBookIssueTable();
}