import { t } from "elysia";

export const issueIdParamValidation = {
    params: t.Object({
        issueId: t.Numeric(),
    }),
};
