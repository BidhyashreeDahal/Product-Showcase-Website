import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

function normalizeItem(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price ?? null,
    image: product.image ?? null,
    category: product.category ?? "",
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("brewline_cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("brewline_cart", JSON.stringify(items));
  }, [items]);

  function addItem(product) {
    const normalized = normalizeItem(product);
    setItems((prev) => {
      const existing = prev.find((item) => item.id === normalized.id);
      if (existing) {
        return prev.map((item) =>
          item.id === normalized.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...normalized, qty: 1 }];
    });
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => {
        const price = Number(item.price);
        if (Number.isNaN(price)) return total;
        return total + price * item.qty;
      }, 0),
    [items]
  );

  const value = {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQty,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
