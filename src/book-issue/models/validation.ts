import { t } from "elysia";

export const issueRequestValidation = {
    body: t.Object({
        memberId: t.Number(),
        bookId: t.Number(),
    })
};