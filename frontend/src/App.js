import "./App.css";
import Navigation from "./customer/components/navigation/Navigation.jsx";
import HomePage from "./customer/pages/homePage/HomePage.jsx";
import Footer from "./customer/components/footer/Footer.jsx";
import Product from "./customer/components/product/Product.jsx";
import ProductDetails from "./customer/components/productDetails/ProductDetails.jsx";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routers/CustomerRoutes.jsx";

function App() {
  return (
    <div className="">

      <Routes>
        <Route path="/*" element={<CustomerRoutes/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
