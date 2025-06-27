import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
export interface User {
    id: string;
    created_at: string;
    full_name: string;
    language_preference: string;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);