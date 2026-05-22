const Database = require('better-sqlite3');

export function initBookTable(): void {

    const dbSchool = new Database('library.db');

    dbSchool.exec(`CREATE TABLE IF NOT EXISTS BOOKS(
            bookid INTEGER PRIMARY KEY, 
            title varchar(50),
            subject varchar(50),
            author varchar(50),
            language varchar(50)
        )`);
}
