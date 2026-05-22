import { db } from '../../db';

export function initBookTable(): void {

    db.run(`CREATE TABLE IF NOT EXISTS BOOKS(
            bookid INTEGER PRIMARY KEY, 
            title varchar(50),
            subject varchar(50),
            author varchar(50),
            language varchar(50)
        )`);
}
