"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";

import CartDrawer from "@/components/layout/CartDrawer";
import PromoStrip from "@/components/home/PromoStrip";
import { useWishlist } from "@/context/WishlistContext";
import { CheckoutData } from "@/lib/checkout";
import { useRouter } from "next/navigation";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { useCart } from "@/context/CartContext";
import { createWhatsappOrderMessage } from "@/lib/checkout";
import { whatsappNumber } from "@/lib/data";
import { money } from "@/lib/format";

export default function FavoritesPage() {
  const { wishlist, toggleFavorite } = useWishlist();
  const { cart, cartOpen, setCartOpen, addToCart, updateQty, removeItem } =
    useCart();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

function checkout(data: CheckoutData) {
  const text = createWhatsappOrderMessage(cart, data);
  window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
}

  return (
    <main className="min-h-screen bg-[#f9e6ec] pb-24 text-[#151313] md:pb-0">
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onUpdate={updateQty}
        onCheckout={checkout}
      />

      <PromoStrip />

      <header className="sticky top-0 z-40 border-b border-white/60 bg-[#f9e6ec]/85 px-4 py-3 backdrop-blur-xl md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-[48px_1fr_48px] items-center gap-3">
<button
  onClick={() => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  }}
  className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-[#76515b] shadow-sm"
>
  <ArrowLeft size={18} />
</button>
          <Link href="/" className="mx-auto flex items-center justify-center">
            <Image
              src="/logo-mai.png"
              alt="El Ropero de Mai"
              width={240}
              height={120}
              priority
              className="h-16 w-auto object-contain sm:h-20 md:h-24 lg:h-28"
            />
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white/80 shadow-sm"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f3c6cf] px-1 text-[10px] font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#bd7284] shadow-sm">
              <Heart size={15} className="fill-[#bd7284]" />
              Tus favoritos
            </div>

            <h1 className="mt-6 font-serif text-5xl leading-[0.9] tracking-[-0.06em] md:text-7xl">
              Prendas guardadas
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[#76515b]">
              Aquí quedan las prendas que más te gustaron para revisarlas,
              comparar y comprar cuando quieras.
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="mx-auto mt-14 max-w-xl rounded-[2rem] bg-white/70 p-10 text-center shadow-xl">
              <Heart className="mx-auto text-[#bd7284]" size={42} />
              <p className="mt-5 font-serif text-3xl">
                Aún no tienes favoritos
              </p>
              <p className="mt-2 text-sm text-[#76515b]">
                Guarda prendas tocando el corazón en la colección.
              </p>

              <Link
                href="/coleccion"
                className="mt-7 inline-flex rounded-full bg-[#151313] px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white"
              >
                Ver colección
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {wishlist.map((product) => {
                const isSoldOut = (product.stock ?? 0) <= 0;

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-[1.5rem] bg-white/75 shadow-xl"
                  >
                    <Link href={`/producto/${product.id}`}>
                      <div className="relative h-56 overflow-hidden bg-[#efd1da] sm:h-72">
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                            isSoldOut ? "grayscale" : ""
                          }`}
                        />

                        {isSoldOut && (
                          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                            Agotado
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#bd7284]">
                        {product.category}
                      </p>

                      <Link href={`/producto/${product.id}`}>
                        <h3 className="mt-1 line-clamp-2 font-serif text-lg leading-tight md:text-xl">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-2 font-black">{money(product.price)}</p>

                      <div className="mt-4 grid gap-2">
                        <button
                          disabled={isSoldOut}
                          onClick={() => !isSoldOut && addToCart(product)}
                          className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-[10px] font-black uppercase tracking-[0.14em] ${
                            isSoldOut
                              ? "cursor-not-allowed bg-[#c9b8b8] text-white/80"
                              : "bg-[#151313] text-white"
                          }`}
                        >
                          {isSoldOut ? "Agotado" : "Comprar"}
                          <ShoppingBag size={14} />
                        </button>

                        <button
                          onClick={() => toggleFavorite(product)}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#76515b]"
                        >
                          Quitar
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <MobileBottomNav cartCount={cartCount} onCart={() => setCartOpen(true)} />
    </main>
  );
}