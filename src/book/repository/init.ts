import { db } from '../../db';

export function initBookTable(): void {

    db.run(`CREATE TABLE IF NOT EXISTS books(
            bookId INTEGER PRIMARY KEY AUTOINCREMENT, 
            title varchar(50) NOT NULL,
            subject varchar(50) NOT NULL,
            author varchar(50) NOT NULL,
            language varchar(50) NOT NULL
        )`);
}
