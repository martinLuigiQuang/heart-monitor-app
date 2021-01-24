import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Header/Header.js';
import Home from './HomePage/Home.js';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <Route exact path="/" render={() => {
          return ( <Home /> );
        }}/>
      </div>
    </Router>
  );
};

export default App;
