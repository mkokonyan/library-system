import { db } from "../../db";

export function initMemberTable(): void {
  db.run(`
  CREATE TABLE IF NOT EXISTS members (
    memberId INTEGER PRIMARY KEY AUTOINCREMENT,
    name CHAR(100) NOT NULL
      CHECK (length(trim(name)) >= 3),
    email CHAR(100) NOT NULL
      CHECK (length(trim(email)) >= 5),
    phone CHAR(100) NOT NULL
      CHECK (length(trim(phone)) >= 8),
    address CHAR(250) NOT NULL
      CHECK (length(trim(address)) >= 5)
  )
`);
}
