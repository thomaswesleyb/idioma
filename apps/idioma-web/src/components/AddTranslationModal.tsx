import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddTranslationModal({ open, onClose, onAdd }) {
    const [language, setLanguage] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState({ language: false, text: false });

    const handleAddClick = () => {
        let hasError = false;
        if (!language.trim()) {
            setError((e) => ({ ...e, language: true }));
            hasError = true;
        } else {
            setError((e) => ({ ...e, language: false }));
        }

        if (!text.trim()) {
            setError((e) => ({ ...e, text: true }));
            hasError = true;
        } else {
            setError((e) => ({ ...e, text: false }));
        }

        if (hasError) return;

        onAdd({ language: language.trim(), text: text.trim() });
        setLanguage('');
        setText('');
        onClose();
    };

    const handleClose = () => {
        setLanguage('');
        setText('');
        setError({ language: false, text: false });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Translation</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                <TextField
                    autoFocus
                    label="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    error={error.language}
                    helperText={error.language && 'Please enter a language'}
                />
                <TextField
                    label="Translation"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    error={error.text}
                    helperText={error.text && 'Please enter a translation'}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleAddClick}
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function TranslationsManager() {
    const [translations, setTranslations] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddTranslation = (newTranslation) => {
        setTranslations((prev) => [
            ...prev,
            { id: Date.now(), ...newTranslation },
        ]);
    };

    return (
        <div>
            <h2>Translations</h2>
            <ul>
                {translations.map((t) => (
                    <li key={t.id}>
                        <strong>{t.language}:</strong> {t.text}
                    </li>
                ))}
            </ul>

            <Button variant="contained" onClick={() => setModalOpen(true)} startIcon={<AddIcon />}>
                Add Translation
            </Button>

            <AddTranslationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddTranslation}
            />
        </div>
    );
}
