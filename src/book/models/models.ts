export interface Book {
    bookId: number | null,
    title: string,
    subject: string,
    author: string,
    language: Language,
}

export enum Language {
    ENGLISH = 'English',
    FRENCH = 'French',
    ARABIC = 'Arabic',
    GERMAN = 'German',
    SPANISH = 'Spanish',
}