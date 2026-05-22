import type { Member } from "../models/models";
import { insertMember, getAll, getById } from "../repository/repository";

export function getAllMembers(): Member[] {
    return getAll();
}

export function getMemberById(memberId: number): Member | null {
    return getById(memberId);
}


export function createMember(member: Member): Member | undefined {
    insertMember(member.name, member.email, member.phone, member.address);
    
    return;
}

