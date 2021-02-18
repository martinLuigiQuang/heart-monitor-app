import React, { useContext, useState } from 'react';
import { english } from './languages.js';

const LanguageContext = React.createContext();
const LanguageToggleContext = React.createContext();

export function useLanguage () {
    return useContext(LanguageContext);
};

export function useLanguageToggle () {
    return useContext(LanguageToggleContext);
};

export default function LanguageProvider ({ children }) {
    const [language, setLanguage] = useState(english);

    function toggleLanguage (language) {
        setLanguage(language);
    };

    return (
        <LanguageContext.Provider value={ language }>
            <LanguageToggleContext.Provider value={ toggleLanguage }>
                { children }
            </LanguageToggleContext.Provider>
        </LanguageContext.Provider>
    );
};
