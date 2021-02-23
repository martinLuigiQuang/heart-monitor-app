import React, { useContext, useState } from 'react';
import { Language, english } from './languages';

export type LanguageType = {
    language: Language,
    toggleLanguage: (language: Language) => Language
}
const LanguageContext = React.createContext<LanguageType | null>(null);
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
