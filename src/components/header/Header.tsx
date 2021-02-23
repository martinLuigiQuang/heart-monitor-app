import { Link } from 'react-router-dom';
import { english, tiếng_việt } from '../languageContext/languages';
import { useLanguage, LanguageType } from '../languageContext/LanguageContext';
import Button from '../button/Button';
import './header.css';

export default function Header() {
    const { language, toggleLanguage } = useLanguage() as LanguageType;
    
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
                <Button label="EN" className="" ariaLabel="choose english language" onClick={() => toggleLanguage(english)} />
                <Button label="VN" className="" ariaLabel="choose vietnamese language" onClick={() => toggleLanguage(tiếng_việt)} />
            </div>
        </header>
    );
};