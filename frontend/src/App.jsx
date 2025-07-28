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
import Dashboard from "./pages/seller/Dashbaord";
import SellerOrders from "./pages/seller/Orders";
import Sidebar from "./components/Sidebar";
import UserPageWarning from "./pages/user/UserPageWarning";
import SellerPageWarning from "./pages/seller/SellerPageWarning";
import SellerProductContextProvider from "./context/SellerProductContextProvider";

function App() {
  return (
    <>
      <SellerProductContextProvider>
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
              <Route path="/seller/dashboard" element={<Dashboard />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
              <Route path="/sidebar" element={<Sidebar />} />
              <Route path="/restricted/user" element={<UserPageWarning />} />
              <Route
                path="/restricted/seller"
                element={<SellerPageWarning />}
              />
            </Routes>
          </BrowserRouter>
          <Footer />
        </ProductContextProvider>
      </SellerProductContextProvider>
    </>
  );
}

export default App;
