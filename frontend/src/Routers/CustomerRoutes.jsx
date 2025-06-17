import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customer/pages/homePage/HomePage";
import Navigation from "../customer/components/navigation/Navigation";
import Footer from "../customer/components/footer/Footer";
import Product from "../customer/components/product/Product";
import ProductDetails from "../customer/components/productDetails/ProductDetails";

const CustomerRoutes = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        {/* login register */}
        <Route path="/login" element={<HomePage />}></Route>
        <Route path="/register" element={<HomePage />}></Route>
        {/* home page */}
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/:levelOne/:levelTwo/:levelThree"
          element={<Product />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRoutes;
