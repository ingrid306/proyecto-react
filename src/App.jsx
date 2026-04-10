import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/productsSlice";
import { NavbarProvider } from "./context/NavbarContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Contact from "./pages/Contact/Contact";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <NavbarProvider>
      <Header />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
                gap: "1rem",
                textAlign: "center",
                padding: "2rem",
                paddingTop: "100px",
              }}
            >
              <span style={{ fontSize: "5rem" }}>404</span>
              <h2 style={{ color: "var(--white)", fontSize: "1.75rem" }}>
                Página no encontrada
              </h2>
              <a href="/" className="btn btn-primary">
                Ir al inicio
              </a>
            </div>
          }
        />
      </Routes>
      <Footer />
    </NavbarProvider>
  );
};

export default App;
