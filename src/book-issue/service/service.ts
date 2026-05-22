import type { BookIssueDetails } from "../models/models";
import { deleteById, getActiveByMemberId, getAllWithDetails } from "../repository/repository";
import { findById as findMemberById } from "../../member/repository/repository";

export function getAllIssues(): BookIssueDetails[] {
    return getAllWithDetails();
}

export function getMemberActiveIssues(memberId: number): BookIssueDetails[] | null {
    if (!findMemberById(memberId)) {
        return null;
    }

    return getActiveByMemberId(memberId);
}

export function returnIssue(issueId: number): boolean {
    try {
        return deleteById(issueId);
    } catch {
        return false;
    }
}
