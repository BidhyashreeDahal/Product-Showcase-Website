// src/pages/_app.js
import "../styles/globals.css";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { CartProvider } from "../components/CartContext";
export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  );
}
