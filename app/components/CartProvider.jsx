"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("trendmart-cart");
    const savedWishlist = localStorage.getItem("trendmart-wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    setIsLoaded(true);
  }, []);

  // 2. Sync to localStorage whenever state changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("trendmart-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("trendmart-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  // --- Cart Actions ---
  const addToCart = (product, quantity = 1) => {
    // MOVE TOASTS HERE: Before the state update to avoid the render error
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      toast.success(`Updated ${product.title} quantity`);
    } else {
      toast.success(`${product.title} added to cart!`);
    }

    setCart((prevCart) => {
      const isAlreadyIn = prevCart.find((item) => item._id === product._id);
      if (isAlreadyIn) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    toast.error("Removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  // --- Wishlist Actions ---
  const toggleWishlist = (product) => {
    const isExist = wishlist.find((item) => item._id === product._id);

    // Side effects (toasts) must happen outside the setter
    if (isExist) {
      toast.error("Removed from wishlist");
    } else {
      toast.success("Saved to wishlist!");
    }

    setWishlist((prev) => {
      if (isExist) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item._id === productId);

  // --- Helpers ---
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
