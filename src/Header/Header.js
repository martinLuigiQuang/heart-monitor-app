import { useState } from 'react';
import { Link } from 'react-router-dom';
import { english, tiếng_việt } from '../Languages/languages.js';

export default function Header(props) {
    const [language, setLanguage] = useState(english);

    /**
     * Toggle the language on display
     * @param {Object} language The object that contains the text information in a particular language
     * @returns void
     */
    function toggleLanguage(language) {
        props.language(language);
        setLanguage(language);
        return;
    };

    return (
        <header>
            <h1>{language.title}</h1>
            <nav>
                <ul>
                    <li><Link to="/">{language.navHome}</Link></li>
                    <li><Link to="/dashboard">{language.navDashboard}</Link></li>
                </ul>
            </nav>
            <div className="languageButtons">
                <button aria-label="choose english language" onClick={() => toggleLanguage(english)}>EN</button>
                <button aria-label="choose vietnamese language" onClick={() => toggleLanguage(tiếng_việt)}>VN</button>
            </div>
        </header>
    );
};