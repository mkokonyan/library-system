import { t } from "elysia";

export const memberValidation = {
    body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email"}),
        phone: t.String({ minLength: 8 }),
        address: t.String({ minLength: 5 }),
    })
};