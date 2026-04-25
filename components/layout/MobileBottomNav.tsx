"use client";

import Link from "next/link";
import { Home, Heart, ShoppingBag, Shirt } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

type Props = {
  cartCount: number;
  onCart: () => void;
};

export default function MobileBottomNav({ cartCount, onCart }: Props) {
  const { wishlist } = useWishlist();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/70 bg-[#f9e6ec]/90 px-3 py-2 shadow-[0_-12px_35px_rgba(104,76,84,0.16)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 items-center gap-2">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#76515b]"
        >
          <Home size={20} />
          Inicio
        </Link>

        <Link
          href="/coleccion"
          className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#76515b]"
        >
          <Shirt size={20} />
          Ropa
        </Link>

        <Link
          href="/favoritos"
          className="relative flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#76515b]"
        >
          <Heart size={20} />
          Favoritos

          {wishlist.length > 0 && (
            <span className="absolute right-3 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#151313] px-1 text-[9px] text-white">
              {wishlist.length}
            </span>
          )}
        </Link>

        <button
          onClick={onCart}
          className="relative flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#76515b]"
        >
          <ShoppingBag size={20} />
          Carrito

          {cartCount > 0 && (
            <span className="absolute right-3 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#151313] px-1 text-[9px] text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}