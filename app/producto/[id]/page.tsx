"use client";

import { useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import CartDrawer from "@/components/layout/CartDrawer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { createWhatsappOrderMessage } from "@/lib/checkout";
import { CheckoutData } from "@/lib/checkout";
import { useProducts } from "@/context/ProductContext";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { whatsappNumber } from "@/lib/data";
import { money } from "@/lib/format";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();

  const { products } = useProducts();
  const { cart, cartOpen, setCartOpen, addToCart, updateQty, removeItem } =
    useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const { isFavorite, toggleFavorite } = useWishlist();
  const id = Number(params.id);
  const foundProduct = products.find((item) => item.id === id);

  if (!foundProduct) notFound();

  const product = foundProduct;
  const isSoldOut = (product.stock ?? 0) <= 0;
  const favorite = isFavorite(product.id);

  const gallery = useMemo(() => {
    return product.gallery?.length ? product.gallery : [product.image];
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? "");

function checkout(data: CheckoutData) {
  const text = createWhatsappOrderMessage(cart, data);
  window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
}

  return (
    <main className="min-h-screen bg-[#f9e6ec] px-4 py-6 pb-24 text-[#151313] md:px-10 md:pb-6">
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onUpdate={updateQty}
        onCheckout={checkout}
      />

      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-3 text-sm font-bold text-[#76515b] shadow-sm backdrop-blur transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 md:grid-cols-[90px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
              {gallery.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-white ${
                    selectedImage === image
                      ? "border-[#151313]"
                      : "border-white/70"
                  }`}
                >
                  <img
                    src={image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="order-1 overflow-hidden rounded-[2rem] bg-white shadow-xl md:order-2">
              <img
                src={selectedImage}
                alt={product.name}
                className={`h-[430px] w-full object-cover sm:h-[580px] lg:h-[720px] ${
                  isSoldOut ? "grayscale" : ""
                }`}
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/65 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {isSoldOut ? (
                <span className="rounded-full bg-red-600 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Agotado
                </span>
              ) : (
                product.tag && (
                  <span className="rounded-full bg-[#151313] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    {product.tag}
                  </span>
                )
              )}

              <span className="rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#bd7284]">
                {product.category}
              </span>
            </div>

            <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.06em] md:text-7xl">
              {product.name}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#684c54]">
              {product.description}
            </p>

            <div className="mt-6">
              <p className="text-3xl font-black">{money(product.price)}</p>

              <p
                className={`mt-2 text-sm font-bold uppercase tracking-[0.16em] ${
                  isSoldOut ? "text-red-600" : "text-[#bd7284]"
                }`}
              >
                {isSoldOut
                  ? "Sin stock disponible"
                  : `Stock disponible: ${product.stock}`}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#76515b]">
                Color: {selectedColor}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    disabled={isSoldOut}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-5 py-3 text-sm font-bold transition ${
                      selectedColor === color
                        ? "border-[#151313] bg-[#151313] text-white"
                        : "border-[#e7b8c3] bg-white text-[#76515b]"
                    } ${isSoldOut ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#76515b]">
                Talla: {selectedSize}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    disabled={isSoldOut}
                    onClick={() => setSelectedSize(size)}
                    className={`grid h-12 min-w-14 place-items-center rounded-full border px-4 text-sm font-bold transition ${
                      selectedSize === size
                        ? "border-[#151313] bg-[#151313] text-white"
                        : "border-[#e7b8c3] bg-white text-[#76515b]"
                    } ${isSoldOut ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_64px]">
              <button
                disabled={isSoldOut}
                onClick={() =>
                  !isSoldOut &&
                  addToCart(product, {
                    selectedSize,
                    selectedColor,
                  })
                }
                className={`flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] shadow-xl transition ${
                  isSoldOut
                    ? "cursor-not-allowed bg-[#c9b8b8] text-white/80"
                    : "bg-[#151313] text-white hover:bg-[#2b2421]"
                }`}
              >
                {isSoldOut ? "Producto agotado" : "Añadir al carrito"}
                <ShoppingBag size={18} />
              </button>

<button
  onClick={() => toggleFavorite(product)}
  className={`grid h-14 place-items-center rounded-full border border-[#e7b8c3] transition ${
    favorite
      ? "bg-[#151313] text-white"
      : "bg-white text-[#bd7284] hover:bg-[#151313] hover:text-white"
  }`}
>
  <Heart className={favorite ? "fill-white" : ""} />
</button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#fff6f8] p-4">
                <Truck className="text-[#bd7284]" />
                <p className="mt-2 font-bold">Envíos a todo Chile</p>
                <p className="mt-1 text-sm text-[#76515b]">
                  Compra fácil y despacho seguro.
                </p>
              </div>

              <div className="rounded-2xl bg-[#fff6f8] p-4">
                <ShieldCheck className="text-[#bd7284]" />
                <p className="mt-2 font-bold">Compra protegida</p>
                <p className="mt-1 text-sm text-[#76515b]">
                  Atención directa por WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <MobileBottomNav cartCount={cartCount} onCart={() => setCartOpen(true)} />
    </main>
  );
}