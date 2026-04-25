"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  Heart,
} from "lucide-react";
import { navItems } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";

type Props = {
  cartCount: number;
  query: string;
  onQuery: (value: string) => void;
  onMenu: () => void;
  onCart: () => void;
  onNavigate: (id: string) => void;
};

export default function Header({
  cartCount,
  query,
  onQuery,
  onMenu,
  onCart,
  onNavigate,
}: Props) {
  const { wishlist } = useWishlist();

  const favoriteCount = wishlist.length;

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#f9e6ec]/85 px-4 py-3 backdrop-blur-xl md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* MOBILE */}
        <div className="grid grid-cols-3 items-center lg:hidden">
          {/* LEFT */}
          <div className="flex justify-start">
            <button
              className="grid h-11 w-11 place-items-center rounded-full bg-white/70 shadow-sm"
              onClick={onMenu}
              aria-label="Abrir menú"
            >
              <Menu size={21} />
            </button>
          </div>

          {/* CENTER */}
          <button
            onClick={() => onNavigate("inicio")}
            className="mx-auto flex items-center justify-center"
            aria-label="Ir al inicio"
          >
            <Image
              src="/logo-mai.png"
              alt="El Ropero de Mai"
              width={220}
              height={110}
              priority
              className="h-16 w-auto object-contain"
            />
          </button>

          {/* RIGHT */}
          <div className="flex justify-end gap-2">
            <Link
              href="/favoritos"
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white/75 shadow-sm"
            >
              <Heart size={19} />

              {favoriteCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f3c6cf] px-1 text-[10px] font-bold">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <button
              onClick={onCart}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white/75 shadow-sm"
            >
              <ShoppingBag size={19} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#e5bcb7] px-1 text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <nav className="flex gap-8 text-sm uppercase tracking-[0.16em]">
              {navItems.slice(0, 3).map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    onNavigate(
                      item === "Inicio" ? "inicio" : item.toLowerCase()
                    )
                  }
                  className="transition hover:text-[#b6847e]"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* CENTER */}
          <button
            onClick={() => onNavigate("inicio")}
            className="mx-auto flex items-center justify-center"
          >
            <Image
              src="/logo-mai.png"
              alt="El Ropero de Mai"
              width={260}
              height={130}
              priority
              className="h-24 w-auto object-contain xl:h-28"
            />
          </button>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 shadow-sm">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder="Buscar..."
                className="w-32 bg-transparent text-sm outline-none"
              />
            </div>

            <UserRound className="text-[#151313]" />

            <Link
              href="/favoritos"
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white/75 shadow-sm transition hover:bg-white"
            >
              <Heart size={20} />

              {favoriteCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-[#f3c6cf] px-1 text-xs font-bold">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <button
              onClick={onCart}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white/75 shadow-sm transition hover:bg-white"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-[#e5bcb7] px-1 text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}