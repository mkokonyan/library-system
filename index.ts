import { Elysia, t } from "elysia";
import { initBookTable } from './src/book/repository/init';
import { createBook, findBookById, getAllBooks } from "./src/book/service/service";
import { bookIdParamValidation, bookValidation } from "./src/book/models/validation";
import type { Book } from "./src/book/models/models";
import { createMember, getAllMembers, getMemberById } from "./src/member/service/service";
import type { Member } from "./src/member/models/models";
import { memberValidation } from "./src/member/models/validation";

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
        .get('/:bookid', ({ set, params: { bookid } }) => {
            const book = findBookById(bookid);
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
      const member = body as Member;
      set.status = 201;

      createMember(member);
    }, memberValidation)
    .get('/:memberId', (context) => {
      context.set.status = 200;

      return getMemberById(Number.parseInt(context.params.memberId));
    },)
);

const hostname: string | undefined = app.server?.hostname;
const serverPort: number | undefined = app.server?.port;

console.log(`Server running at ${hostname}:${serverPort}`);

function initTables(): void {
  initBookTable();
  initMemberTable();
}