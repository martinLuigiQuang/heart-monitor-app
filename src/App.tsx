import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './components/homePage/Home';
import Dashboard from './components/dashboard/Dashboard';
import LanguageProvider from './components/common/languageContext/LanguageContext';
import YearOptionProvider from './components/common/yearOptionContext/YearOptionContext';
import DatasetsProvider from './components/dashboard/DatasetsContext';
import UserInputProvider from './components/homePage/UserInputContext';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <LanguageProvider>
          <YearOptionProvider>
            <div className="App">
              <header>
                <Header />
              </header>
              <DatasetsProvider>
                <main>
                  <UserInputProvider>
                    <Route exact path="/" component={ Home }/>
                  </UserInputProvider>
                  <Route path="/dashboard" component={ Dashboard }/>
                </main>
              </DatasetsProvider>
            </div>
          </YearOptionProvider>
        </LanguageProvider>
    </Router>
  );
};

export default App;
