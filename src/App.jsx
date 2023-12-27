import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ShopNow from "./Components/ShopNow";
import AppContext, { UseGlobalContext } from "./Components/Context";
import ViewProduct from "./Components/ViewProduct";
import { ToastContainer } from "react-toastify";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop-now" element={<ShopNow />} />
          <Route path="/product-details" element={<ViewProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
