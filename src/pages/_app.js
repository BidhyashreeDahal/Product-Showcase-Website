// src/pages/_app.js
import "../styles/globals.css";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { CartProvider } from "../components/CartContext";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <div className={`${inter.variable} ${playfair.variable}`}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </CartProvider>
  );
}
