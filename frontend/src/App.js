import "./App.css";
import Navigation from "./customer/components/navigation/Navigation.jsx";
import HomePage from "./customer/pages/homePage/HomePage.jsx";
import Footer from "./customer/components/footer/Footer.jsx";
import Product from "./customer/components/product/Product.jsx";

function App() {
  return (
    <div className="">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        <Product/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
