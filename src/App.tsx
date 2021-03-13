import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './components/homePage/Home';
import Dashboard from './components/dashboard/Dashboard';
import LanguageProvider from './components/common/languageContext/LanguageContext';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <LanguageProvider>
          <div className="App">
              <header>
                <Header />
              </header>
              <main>
                <Route exact path="/" component={ Home }/>
                <Route path="/dashboard" component={ Dashboard }/>
              </main>
          </div>
        </LanguageProvider>
    </Router>
  );
};

export default App;
