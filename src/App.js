import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './components/homePage/Home.js';
import Dashboard from './components/dashboard/Dashboard.js';
import LanguageProvider from './components/languageContext/LanguageContext';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <LanguageProvider>
            <Header />
            <Route exact path="/" component={ Home }/>
            <Route path="/dashboard" component={ Dashboard }/>
          </LanguageProvider>
        </div>
    </Router>
  );
};

export default App;
