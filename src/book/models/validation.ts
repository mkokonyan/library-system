import { t } from "elysia";
import { Language, type Book } from "./models";

export const bookValidation = {
    body: t.Object({
        title: t.String({ minLength: 2 }),
        subject: t.String({ minLength: 2 }),
        author: t.String({ minLength: 3 }),
        language: t.Enum(Language)
    })
};