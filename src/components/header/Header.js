import { Link } from 'react-router-dom';
import { english, tiếng_việt } from '../languageContext/languages.js';
import { useLanguage, useLanguageToggle } from '../languageContext/LanguageContext.js';
import Button from '../button/Button.js';
import './header.css';

export default function Header() {
    const language = useLanguage();
    const toggleLanguage = useLanguageToggle();

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
                <Button label="EN" className="" ariaLabel="choose english language" onClick={() => toggleLanguage(english)}></Button>
                <Button label="VN" className="" ariaLabel="choose vietnamese language" onClick={() => toggleLanguage(tiếng_việt)}></Button>
            </div>
        </header>
    );
};