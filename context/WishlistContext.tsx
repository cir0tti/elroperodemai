"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/format";

type WishlistContextType = {
  wishlist: Product[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: Product) => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("elroperodemai-wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  function saveWishlist(newWishlist: Product[]) {
    setWishlist(newWishlist);
    localStorage.setItem("elroperodemai-wishlist", JSON.stringify(newWishlist));
  }

  function isFavorite(id: number) {
    return wishlist.some((item) => item.id === id);
  }

  function toggleFavorite(product: Product) {
    const exists = isFavorite(product.id);

    if (exists) {
      saveWishlist(wishlist.filter((item) => item.id !== product.id));
      return;
    }

    saveWishlist([product, ...wishlist]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist debe usarse dentro de WishlistProvider");
  }

  return context;
}