import { db } from "../../db";
import type { Member } from "../models/models";

export function getAll(): Member[] {
    return db.prepare<Member, []>(
        "SELECT * FROM members",
    ).all();
}

export function create(member: Member): void {
    const { name, email, phone, address } = member;

    const stmt = db.prepare<Member, [string, string, string, string]>(
        "INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)",
    );

    stmt.run(name, email, phone, address);
}

export function findById(memberId: number): Member | null {
    const stmt = db.prepare<Member, number>(
        "SELECT * FROM members WHERE memberId = ?",
    );
    return stmt.get(memberId);
}
