"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
  Eye,
  Flame,
  Crown,
} from "lucide-react";
import { Product, money } from "@/lib/format";
import { useWishlist } from "@/context/WishlistContext";

type Props = {
  products: Product[];
  activeCategory: string;
  onCategory: (category: string) => void;
  onAdd: (product: Product) => void;
};

const filters = [
  "Todos",
  "Novedades",
  "Parkas",
  "Cortavientos",
  "Pantalones",
  "Polar",
];

export default function ProductSection({
  products,
  activeCategory,
  onCategory,
  onAdd,
}: Props) {
  const { isFavorite, toggleFavorite } = useWishlist();

  return (
    <section
      id="novedades"
      className="relative overflow-hidden bg-[#f9e6ec] px-4 py-16 sm:px-6 md:px-10 lg:py-24"
    >
      <div className="absolute left-[-10rem] top-10 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute right-[-8rem] top-40 h-[30rem] w-[30rem] rounded-full bg-[#f3c6cf]/50 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#fff7fb]/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#bd7284] shadow-sm backdrop-blur-xl">
              <Crown size={14} />
              Selección premium
            </div>

            <h2 className="mx-auto mt-6 max-w-5xl font-serif text-5xl leading-[0.86] tracking-[-0.07em] text-[#151313] sm:text-6xl md:text-7xl lg:mx-0">
              Nueva colección
              <span className="block italic text-[#bd7284]">
                elegida para destacar
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#684c54] sm:text-base md:text-lg lg:mx-0">
              Una vitrina cuidada con prendas seleccionadas, stock real y compra
              rápida por WhatsApp.
            </p>
          </div>

          <Link
            href="/coleccion"
            className="hidden rounded-full border border-[#151313]/10 bg-white/70 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#151313] shadow-sm transition hover:-translate-y-1 hover:bg-white lg:inline-flex"
          >
            Explorar todo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="-mx-4 mt-10 overflow-x-auto px-4 pb-3 scrollbar-hide sm:mx-0 sm:px-0">
          <div className="flex w-max min-w-full gap-2 sm:flex-wrap sm:justify-center lg:justify-start">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onCategory(filter)}
                className={`shrink-0 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] transition ${
                  activeCategory === filter
                    ? "bg-[#151313] text-white shadow-xl"
                    : "bg-white/80 text-[#76515b] shadow-sm hover:bg-[#f3c6cf] hover:text-[#151313]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => {
            const isSoldOut = (product.stock ?? 0) <= 0;
            const isLowStock = !isSoldOut && (product.stock ?? 0) <= 2;
            const favorite = isFavorite(product.id);
            const secondImage = product.gallery?.[1] ?? product.image;

            return (
              <article
                key={product.id}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_24px_70px_rgba(104,76,84,0.13)] backdrop-blur-xl transition duration-500 ${
                  isSoldOut
                    ? "opacity-75"
                    : "hover:-translate-y-2 hover:shadow-[0_34px_90px_rgba(104,76,84,0.22)]"
                }`}
              >
                {index === 0 && !isSoldOut && (
                  <div className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#151313] shadow-xl">
                    Top pick
                  </div>
                )}

                <div className="relative h-[390px] overflow-hidden bg-[#efd1da]">
                  <Link href={`/producto/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                        isSoldOut
                          ? "grayscale"
                          : "group-hover:scale-[1.06] group-hover:opacity-0"
                      }`}
                    />

                    <img
                      src={secondImage}
                      alt={product.name}
                      className={`absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 ${
                        isSoldOut
                          ? "grayscale"
                          : "group-hover:scale-[1.06] group-hover:opacity-100"
                      }`}
                    />
                  </Link>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#ffffff33,transparent_45%)]" />

                  <div className="absolute left-4 top-16 z-20 flex flex-wrap gap-2">
                    {isSoldOut ? (
                      <span className="rounded-full bg-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
                        Agotado
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#151313] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
                        <Flame size={13} />
                        Últimas unidades
                      </span>
                    ) : (
                      product.tag && (
                        <span className="rounded-full bg-[#151313] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
                          {product.tag}
                        </span>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    className={`absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full shadow-xl backdrop-blur-xl transition ${
                      favorite
                        ? "bg-[#151313] text-white"
                        : "bg-white/90 text-[#bd7284] hover:bg-[#151313] hover:text-white"
                    }`}
                    aria-label="Guardar favorito"
                  >
                    <Heart size={18} className={favorite ? "fill-white" : ""} />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#f3c6cf]">
                      {product.category}
                    </p>

                    <Link href={`/producto/${product.id}`}>
                      <h3 className="mt-2 line-clamp-2 font-serif text-3xl leading-[0.92] tracking-[-0.05em] transition hover:text-[#f3c6cf]">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xl font-black">
                          {money(product.price)}
                        </p>

                        <p
                          className={`mt-1 text-[10px] font-black uppercase tracking-[0.16em] ${
                            isLowStock ? "text-[#ffd3dc]" : "text-white/70"
                          }`}
                        >
                          {isSoldOut
                            ? "Sin stock"
                            : isLowStock
                            ? `Solo quedan ${product.stock}`
                            : `Stock: ${product.stock ?? 0}`}
                        </p>
                      </div>

                      <button
                        disabled={isSoldOut}
                        onClick={() => !isSoldOut && onAdd(product)}
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full shadow-xl transition sm:hidden ${
                          isSoldOut
                            ? "cursor-not-allowed bg-white/40 text-white/60"
                            : "bg-white text-[#151313] hover:bg-[#f3c6cf]"
                        }`}
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="line-clamp-2 text-sm leading-relaxed text-[#76515b]">
                    Prenda seleccionada para un look cómodo, moderno y con
                    presencia.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <Link
                      href={`/producto/${product.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#151313]/10 bg-white/85 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#151313] transition hover:bg-[#f3c6cf]"
                    >
                      <Eye size={15} />
                      Ver detalles
                    </Link>

                    <button
                      disabled={isSoldOut}
                      onClick={() => !isSoldOut && onAdd(product)}
                      className={`hidden w-full items-center justify-center gap-2 rounded-full py-3 text-[11px] font-black uppercase tracking-[0.16em] shadow-md transition sm:flex ${
                        isSoldOut
                          ? "cursor-not-allowed bg-[#c9b8b8] text-white/80"
                          : "bg-[#151313] text-white hover:-translate-y-0.5 hover:bg-[#2b2421]"
                      }`}
                    >
                      {isSoldOut ? "Agotado" : "Añadir al carrito"}
                      <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="mt-12 rounded-[2rem] border border-white/70 bg-white/70 p-10 text-center shadow-xl backdrop-blur">
            <Sparkles className="mx-auto text-[#bd7284]" size={34} />
            <p className="mt-4 font-serif text-3xl tracking-[-0.04em]">
              No encontramos productos
            </p>
            <p className="mt-3 text-sm text-[#6d5751]">
              Prueba con otra búsqueda o categoría.
            </p>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/coleccion"
            className="group inline-flex items-center gap-3 rounded-full bg-[#151313] px-7 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#2b2421]"
          >
            Ver toda la colección
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}