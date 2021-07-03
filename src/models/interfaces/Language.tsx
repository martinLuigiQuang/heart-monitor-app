import Language from "../types/Language";

interface LanguageInterface {
    language: Language,
    toggleLanguage: (language: Language) => Language
};

export default LanguageInterface;