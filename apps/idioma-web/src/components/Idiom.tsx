import type {Idiom, Translations} from "../types.ts";
import {useEffect, useState} from "react";
import {supabase} from "../lib/supabaseClient.ts";

interface IdiomItemProps {
    idiom: Idiom;
}

export function Idiom({ idiom }: IdiomItemProps) {
    const [translations, setTranslations] = useState<Translations[]>([]);

    useEffect(() => {
       const fetchTranslations = async () => {
           const {data, error} = await supabase
               .from("translations")
               .select("*")
               .eq("idiom_id", idiom.id)
               .eq("approved", true);

           if (!error) {
               setTranslations(data || []);
           } else {
               console.log("Error getting translations" + error);
           }
       };

       fetchTranslations();
    }, [idiom.id]);

    return (
        <li className="border p-4 rounded shadow mb-4">
            <h3 className="font-bold text-lg">{idiom.text} <span className="text-gray-500">({idiom.language})</span>
            </h3>
            {idiom.description && <p className="text-sm italic">{idiom.description}</p>}

            {translations.length > 0 ? (
                <div className="mt-2">
                    <h4 className="font-semibold">Translations:</h4>
                    <ul className="list-disc list-inside">
                        {translations.map(t => (
                            <li key={t.id}>
                                {t.translated_text}
                                {t.description && (
                                    <span className="text-sm text-gray-600"> — {t.description}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-sm text-gray-500 mt-1">No approved translations yet.</p>
            )}
        </li>
    );
}