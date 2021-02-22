import React, { useContext, useState } from 'react';
import { Language, english } from './languages';

type LanguageType = {
    language: Language,
    toggleLanguage: (language: Language) => Language
}
const LanguageContext = React.createContext<LanguageType | undefined>(undefined);
export function useLanguage () {
    return useContext(LanguageContext);
};

export default function LanguageProvider ({ children }: HTMLElement): JSX.Element {
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
