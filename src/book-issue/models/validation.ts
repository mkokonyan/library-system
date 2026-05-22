import { t } from "elysia";

export const issueIdParamValidation = {
    params: t.Object({
        issueId: t.Numeric(),
    }),
};

export const issueRequestValidation = {
    body: t.Object({
        memberId: t.Number(),
        bookId: t.Number(),
    })
};