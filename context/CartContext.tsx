"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/lib/format";

type AddOptions = {
  selectedSize?: string;
  selectedColor?: string;
};

type CartContextType = {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
  addToCart: (product: Product, options?: AddOptions) => void;
  updateQty: (id: number, amount: number) => void;
  removeItem: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

function normalize(value?: string) {
  return value || "";
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("elroperodemai-cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  function saveCart(newCart: CartItem[]) {
    setCart(newCart);
    localStorage.setItem("elroperodemai-cart", JSON.stringify(newCart));
  }

  function addToCart(product: Product, options?: AddOptions) {
    const selectedSize = normalize(options?.selectedSize);
    const selectedColor = normalize(options?.selectedColor);

    const newCart = (() => {
      const existing = cart.find(
        (item) =>
          item.id === product.id &&
          normalize(item.selectedSize) === selectedSize &&
          normalize(item.selectedColor) === selectedColor
      );

      if (existing) {
        return cart.map((item) =>
          item.id === product.id &&
          normalize(item.selectedSize) === selectedSize &&
          normalize(item.selectedColor) === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...cart,
        {
          ...product,
          quantity: 1,
          selectedSize: selectedSize || undefined,
          selectedColor: selectedColor || undefined,
        },
      ];
    })();

    saveCart(newCart);
    setCartOpen(true);
  }

  function updateQty(id: number, amount: number) {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );

    saveCart(newCart);
  }

  function removeItem(id: number) {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}