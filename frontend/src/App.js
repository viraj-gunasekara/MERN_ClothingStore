import "./App.css";
import Navigation from "./customer/components/navigation/Navigation.jsx";
import HomePage from "./customer/pages/homePage/HomePage.jsx";
import Footer from "./customer/components/footer/Footer.jsx";

function App() {
  return (
    <div className="">
      <Navigation />
      <div>
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
