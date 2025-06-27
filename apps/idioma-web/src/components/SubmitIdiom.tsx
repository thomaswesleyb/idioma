import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function SubmitIdiom({ onSubmitted }: { onSubmitted?: () => void }) {
    const [idiom, setIdiom] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            setError('You must be logged in to submit an idiom.');
            setLoading(false);
            return;
        }

        const { error: insertError } = await supabase.from('idioms').insert([
            {
                text: idiom,
                language,
                description: description,
                user_id: user.id,
                approved: false,
            },
        ]);

        if (insertError) {
            setError(insertError.message);
        } else {
            setSuccess(true);
            setIdiom('');
            setLanguage('');
            setDescription('');
            if (onSubmitted) onSubmitted();
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                type="text"
                placeholder="Idiom"
                value={idiom}
                onChange={(e) => setIdiom(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="">Select a language</option>
                <option value="English">English</option>
                <option value="Russian">Russian</option>
                <option value="Ukrainian">Ukrainian</option>
            </select>
            <textarea
                placeholder="Explanation"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />

            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                {loading ? 'Submitting...' : 'Submit Idiom'}
            </button>

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">Idiom submitted for review!</p>}
        </form>
    );
}
