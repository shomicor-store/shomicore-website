'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Sync from browser LocalStorage on load
  useEffect(() => {
    const savedCart = localStorage.getItem('shomicore_bag');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Cart hydration mismatch error:", err);
      }
    }
    setLoading(false);
  }, []);

  // 2. Sync to browser LocalStorage on state changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('shomicore_bag', JSON.stringify(cart));
    }
  }, [cart, loading]);

  // 3. Central Action: Dispatch item variant to cart tree
 const addToCart = (product, size, color, quantity = 1) => {
  setCart((prev) => {
    // ⚡ Strict lookup prevents double execution bugs under Next.js Strict Mode hot-reloads
    const matchIdx = prev.findIndex(
      (item) => item.id === product.id && item.size === size && item.color === color
    );

    if (matchIdx > -1) {
      // Create a brand new, detached array copy rather than mutating the parameter directly
      const updatedCart = prev.map((item, idx) => 
        idx === matchIdx 
          ? { ...item, quantity: item.quantity + Number(quantity) } 
          : item
      );
      return updatedCart;
    }

    // Capture the first image inside the database array dynamically safely
    const mainImg = Array.isArray(product.images) ? product.images[0] : product.images;

    return [
      ...prev,
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: parseFloat(product.price),
        image: mainImg || '/product-placeholder.png',
        size: size,
        color: color || 'Standard',
        quantity: Number(quantity)
      }
    ];
  });
  
  setIsCartOpen(true);
};

  const updateQuantity = (id, size, color, qty) => {
    if (qty < 1) return removeFromCart(id, size, color);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, isCartOpen, setIsCartOpen, addToCart, 
      updateQuantity, removeFromCart, clearCart, cartTotal, cartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be initialized within a CartProvider envelope");
  return context;
}
