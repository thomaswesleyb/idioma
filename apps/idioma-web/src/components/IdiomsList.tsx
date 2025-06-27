import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Idiom as IdiomType } from "../types.ts";
import { Idiom } from "./Idiom.tsx";

export function IdiomsList() {
    const [idioms, setIdioms] = useState<IdiomType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIdioms = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("idioms")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) setError(error.message);
            else setIdioms(data ?? []);
            setLoading(false);
        };

        fetchIdioms();
    }, []);

    if (loading) return <p>Loading idioms...</p>;
    if (error) return <p>Error loading idioms: {error}</p>;
    if (idioms.length === 0) return <p>No idioms found.</p>;

    return (
        <ul>
            {idioms.map((idiom) => (
                <Idiom key={idiom.id} idiom={idiom} />
            ))}
        </ul>
    );
}
