import React, { useContext, useState } from 'react';
import { english } from './languages';
import Language from '../../../models/types/Language';
import LanguageInterface from '../../../models/interfaces/Language';

// Create and export the Language Context
const LanguageContext = React.createContext<LanguageInterface | null>(null);
export function useLanguage () {
    return useContext(LanguageContext);
};

export default function LanguageProvider ({ children }: { children: JSX.Element }): JSX.Element {
    const [language, setLanguage] = useState(english);

    function toggleLanguage (language: Language): Language {
        setLanguage(language);
        return language;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            { children }
        </LanguageContext.Provider>
    );
};
