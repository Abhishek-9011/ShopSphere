import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/user/Landing";
import Products from "./pages/user/Products";
import CartPage from "./pages/user/Cart";
import Profile from "./pages/user/Porfile";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import ProductContextProvider from "./context/ProductContextProvider";
import SellerProducts from "./pages/seller/SellerProducts";

function App() {
  return (
    <>
      <ProductContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/seller/products" element={<SellerProducts />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ProductContextProvider>
    </>
  );
}

export default App;
