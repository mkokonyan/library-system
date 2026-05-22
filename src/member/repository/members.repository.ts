import { db } from "../../db"
import type { Member } from "./member.model";


export function selectAllMembers(): Member[] {
  const stmt = db.prepare<Member, []>(
    "select * from members",
  );
  return stmt.all();
}

export function selectMemberById(memberId: number): Member {
  const stmt = db.prepare<Member, number>(
    "select * from members where memverId=?",
  );
  return stmt.all(memberId);
}

export function insertMember(name: string, email: string, phone: string, address: string): Member {
  const stmt = db.prepare<Member, [string]>(
    "insert into members(name,email,phone,addres) values(?,?,?,?)",
  );

  return stmt.run(name, email, phone, address);
}

