// CartContext - Shopping cart state management with localStorage persistence
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Storage key for localStorage persistence
const STORAGE_KEY_CART = "acesynergi_cart";

export interface CartItem {
  id: string;
  title: string;
  image: string;
  duration: string;
  format: string;
  price: number;
  originalPrice: number;
  quantity: number;
  dates: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage on initial render
function getInitialCart(): CartItem[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CART);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
    }
  }
  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getInitialCart);
  
  // Persist cart to localStorage whenever items change
  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
      } else {
        localStorage.removeItem(STORAGE_KEY_CART);
      }
    } catch (e) {
      console.error("Error saving cart to localStorage:", e);
    }
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(current => {
      const existingItem = current.find(i => i.id === item.id);
      if (existingItem) {
        return current.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...current, item];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
