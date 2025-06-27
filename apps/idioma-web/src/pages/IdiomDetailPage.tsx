import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Idiom} from "../types.ts";
import AddButton from "../components/AddButton.tsx";
import AddTranslationModal from "../components/AddTranslationModal.tsx";

interface Translation {
    id: string;
    translated_text: string;
    translated_language: string;
    description?: string | null;
    example?: string | null;
    approved: boolean;
}

export default function IdiomDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [idiom, setIdiom] = useState<Idiom | null>(null);
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    //
    // const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleAddTranslation = () => {
        closeModal();
    }

    useEffect(() => {
        const fetchIdiom = async () => {
            const { data, error } = await supabase.from('idioms')
                .select('*')
                .eq('id', id)
                .single();

            if (!error) setIdiom(data);
        };

        const fetchTranslations = async () => {
            const { data, error } = await supabase.from('translations')
                .select('*')
                .eq('idiom_id', id)
                .eq('approved', true);

            if (!error) setTranslations(data || []);
        };

        Promise.all([fetchIdiom(), fetchTranslations()]).then(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!idiom) return <p>Idiom not found</p>;

    return (
        <div className="p-4 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">{idiom.text}</h2>
            <p className="text-gray-600">Language: {idiom.language}</p>

            {translations.length === 0 ? (
                <p>No translations yet.</p>
            ) : (
                <ul className="list-none pl-0 space-y-4">
                    {translations.map((t) => (
                        <li key={t.id} className="list-none border rounded p-4">
                            <p className="font-semibold">{t.translated_text} ({t.translated_language})</p>
                            {t.description && <p className="text-gray-700">{t.description}</p>}
                            {t.example && <p className="text-gray-500 italic">Ex: {t.example}</p>}
                        </li>
                    ))}
                </ul>
            )}

            {/*<AddButton*/}
            {/*    onClick={openModal}*/}
            {/*    label={"Add Translation"}*/}
            {/*/>*/}
            <AddTranslationModal
                open={modalOpen}
                onClose={closeModal}
                onAdd={handleAddTranslation}
            />
            {/* Insert your <SubmitTranslation /> component here */}
        </div>
    );
}
