import { Elysia } from "elysia";
import { initBookTable } from './src/book/repository/init';
import { createBook, getAllBooks } from "./src/book/service/service";
import { bookValidation } from "./src/book/models/validation";
import type { Book } from "./src/book/models/models";
import "./src/member/repository/init";

initTables();

const port: number = 3000;
const app: Elysia = new Elysia().listen(port);


app.group('/books', (app) =>
    app.get('', ({ set }) => {
        const allBooks = getAllBooks();
        set.status = 200;
        return allBooks;
    })
        .post('', ({ body, set }) => {
            const newBook = body as Book;
            createBook(newBook);
        }, bookValidation)
        .get('/:bookid', () => { })
);


const hostname: string | undefined = app.server?.hostname;
const serverPort: number | undefined = app.server?.port;

console.log(`Server running at ${hostname}:${serverPort}`);

function initTables(): void {
    initBookTable();
}