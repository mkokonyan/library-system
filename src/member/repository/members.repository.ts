import { db } from "../../db"
import type { Member } from "./member.model";


export function selectAllMembers(): Member[] {
  const stmt = db.prepare<Member, []>(
    "SELECT * FROM members",
  );
  return stmt.all();
}

export function selectMemberById(memberId: number): Member {
  const stmt = db.prepare<Member, number>(
    "SELECT * FROM members WHERE memberId=?",
  );
  return stmt.get(memberId);
}

export function insertMember(name: string, email: string, phone: string, address: string): Member {
  const stmt = db.prepare<Member, [string]>(
    "INSERT INTO members(name,email,phone,address) values(?,?,?,?)",
  );

  return stmt.run(name, email, phone, address);
}