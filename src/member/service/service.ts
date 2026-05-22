import type { Member } from "../models/models";
import { create, findById, getAll } from "../repository/repository";

export function getAllMembers(): Member[] {
    return getAll();
}

export function createMember(member: Member): boolean {
    try {
        create(member);
        return true;
    } catch {
        return false;
    }
}

export function findMemberById(memberId: number): Member | null {
    return findById(memberId);
}
