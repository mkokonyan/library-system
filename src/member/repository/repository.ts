import { db } from "../../db"
import type { Member } from "../models/models";
import { type Changes } from "bun:sqlite";


export function getAll(): Member[] {
  const stmt = db.prepare<Member, []>(
    "SELECT * FROM members",
  );
  return stmt.all();
}

export function getById(memberId: number): Member | null {
  const stmt = db.prepare<Member, number>(
    "SELECT * FROM members WHERE memberId=?",
  );
  return stmt.get(memberId);
}

export function insertMember(name: string, email: string, phone: string, address: string): Changes {
  const stmt = db.prepare<Member, [string, string, string, string]>(
    "INSERT INTO members(name,email,phone,address) values(?,?,?,?)",
  );

  return stmt.run(name, email, phone, address);
}