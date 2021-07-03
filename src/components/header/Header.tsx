import { Link } from 'react-router-dom';
import { english, tiếng_việt } from '../common/languageContext/languages';
import { useLanguage } from '../common/languageContext/LanguageContext';
import Button from '../common/button/Button';
import './header.css';

export default function Header() {
    const languageObj = useLanguage();
    if (languageObj) {
        const { language, toggleLanguage } = languageObj;
        return (
            <div className="header">
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
            </div>
        );
    };
    return null;
};