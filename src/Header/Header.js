import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Heart Monitor</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;