import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Header/Header.js';
import Home from './HomePage/Home.js';
import Dashboard from './Dashboard/Dashboard.js';
import { english } from './Languages/languages.js';

function App() {
  const [language, setLanguage] = useState(english);

  function getLanguage(language) {
    setLanguage(language);
  };
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header language={(language) => getLanguage(language)} />
        <Route exact path="/" render={() => {
          return ( <Home language={language} /> );
        }}/>
        <Route path="/dashboard" render={() => {
          return ( <Dashboard language={language} /> );
        }}/>
      </div>
    </Router>
  );
};

export default App;
