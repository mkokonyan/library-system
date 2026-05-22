# Library System API

REST API for managing library members, books, and book issues. Built with [Bun](https://bun.sh), Elysia, and SQLite.

## Prerequisites

- [Bun](https://bun.sh) installed

## Getting started

1. Install dependencies:

```bash
bun install
```

2. Start the server (runs on **http://localhost:3001** and creates `library.db` automatically):

```bash
bun index.ts
```

3. Run the requests below **in order** - issues require existing members and books. Adjust IDs in later steps if your auto-generated IDs differ.

## API testing with curl

### Members

**1. Create member**

```bash
curl --location 'http://localhost:3001/members' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "migration_forward_e_commerce.rss",
    "email": "Candice_Brakus@hotmail.com",
    "phone": "995-852-2962",
    "address": "8149 Leannon Trafficway"
}'
```

**2. Get all members**

```bash
curl --location 'http://localhost:3001/members'
```

**3. Get member by ID**

```bash
curl --location 'http://localhost:3001/members/2'
```

### Books

**4. Create book**

`language` must be one of: `English`, `French`, `Arabic`, `German`, `Spanish`.

```bash
curl --location 'http://localhost:3001/books' \
--header 'Content-Type: application/json' \
--data '{
    "title": "District Tactics Strategist",
    "subject": "McCullough and Sons",
    "author": "Kevin Spinka",
    "language": "English"
}'
```

**5. Get all books**

```bash
curl --location 'http://localhost:3001/books'
```

**6. Get book by ID**

```bash
curl --location 'http://localhost:3001/books/1'
```

### Book issues

**7. Create issue** (issue a book to a member)

```bash
curl --location 'http://localhost:3001/issues' \
--header 'Content-Type: application/json' \
--data '{
    "memberId": 1,
    "bookId": 3
}'
```

**8. Get all issues** (includes member and book details)

```bash
curl --location 'http://localhost:3001/issues'
```

**9. Get active issues by member**

```bash
curl --location 'http://localhost:3001/members/1/issues'
```

**10. Remove issue** (return book)

```bash
curl --location --request DELETE 'http://localhost:3001/issues/1'
```

## Notes

- Data is stored in `library.db` in the project root (listed in `.gitignore`).
- To reset the database: stop the server, delete `library.db`, and start again with `bun index.ts`.
- A book can only have one active issue at a time (`bookId` is unique in `book_issues`).
- `issueId` and `issueDate` are assigned automatically when creating an issue.
