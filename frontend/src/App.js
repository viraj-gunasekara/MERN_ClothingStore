import logo from './logo.svg';
import './App.css';
import Navigation from './customer/components/navigation/Navigation.jsx'
import HomePage from './customer/pages/homePage/HomePage.jsx'

function App() {
  return (
    <div className="">
      <Navigation/>
      <div>
        <HomePage/>
      </div>
    </div>
  );
}

export default App;
