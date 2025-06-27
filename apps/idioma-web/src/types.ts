export interface Idiom {
    id: string;
    created_at: string;
    text: string;
    language: string;
    description?: string | null;
    example?: string | null;
    user_id: string;
    approved: boolean;
}

export interface Translations {
    id: string;
    created_at: string;
    translated_text: string;
    translated_language: string;
    description?: string | null;
    example?: string | null;
    user_id: string;
    approved: boolean;
}