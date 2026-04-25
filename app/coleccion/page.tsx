"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  MessageCircleHeart,
  RefreshCw,
} from "lucide-react";

import CartDrawer from "@/components/layout/CartDrawer";
import { CheckoutData } from "@/lib/checkout";
import PromoStrip from "@/components/home/PromoStrip";
import { createWhatsappOrderMessage } from "@/lib/checkout";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { useWishlist } from "@/context/WishlistContext";
import { whatsappNumber } from "@/lib/data";
import { money, Product } from "@/lib/format";

const filters = [
  "Todos",
  "Novedades",
  "Parkas",
  "Cortavientos",
  "Pantalones",
  "Polar",
  "Accesorios",
];

const sections = [
  {
    title: "Novedades",
    subtitle: "Lo más nuevo para ti",
    filter: "Novedades",
    icon: Sparkles,
  },
  {
    title: "Parkas",
    subtitle: "Abrigo con estilo",
    filter: "Parkas",
    icon: Truck,
  },
  {
    title: "Cortavientos",
    subtitle: "Livianos, cómodos y versátiles",
    filter: "Cortavientos",
    icon: Heart,
  },
  {
    title: "Pantalones",
    subtitle: "Básicos que combinan con todo",
    filter: "Pantalones",
    icon: Sparkles,
  },
  {
    title: "Polar",
    subtitle: "Looks cómodos y modernos",
    filter: "Polar",
    icon: Heart,
  },
  {
    title: "Accesorios",
    subtitle: "Detalles para completar tu look",
    filter: "Accesorios",
    icon: Sparkles,
  },
];

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [query, setQuery] = useState("");

  const { products } = useProducts();

  const { cart, cartOpen, setCartOpen, addToCart, updateQty, removeItem } =
    useCart();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeFilter === "Todos" || product.category === activeFilter;

      const matchSearch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, activeFilter, query]);

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
          <Link
            href="/"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-[#76515b] shadow-sm transition hover:bg-white"
          >
            <ArrowLeft size={18} />
          </Link>

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

      <MobileBottomNav cartCount={cartCount} onCart={() => setCartOpen(true)} />

      <section className="relative overflow-hidden px-4 py-14 md:px-10 md:py-20">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-[#f3c6cf]/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#bd7284] shadow-sm">
              <Sparkles size={14} />
              Colección completa
            </div>

            <h1 className="mt-6 font-serif text-5xl leading-[0.9] tracking-[-0.06em] md:text-7xl">
              Todas nuestras prendas
              <span className="block font-serif italic text-[#bd7284]">
                en un solo lugar
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#684c54] md:text-lg">
              Explora toda la ropa disponible de ElroperodeMai.
            </p>
          </div>

          <div className="relative hidden min-h-[430px] overflow-hidden rounded-[3rem] bg-white/40 shadow-2xl lg:block">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90"
              alt="Colección completa"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/45 p-3 shadow-xl backdrop-blur-xl">
          <div className="grid gap-3 lg:grid-cols-[1fr_340px]">
            <div className="overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex w-max min-w-full gap-2 lg:flex-wrap">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] transition ${
                      activeFilter === filter
                        ? "bg-[#151313] text-white"
                        : "bg-white/85 text-[#76515b]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/85 px-5 py-3">
              <Search size={18} className="text-[#bd7284]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar prenda..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {activeFilter !== "Todos" || query ? (
        <section className="px-4 pb-20 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="Resultados"
              subtitle={`${filteredProducts.length} prendas encontradas`}
            />
            <ProductGrid products={filteredProducts} onAdd={addToCart} />
          </div>
        </section>
      ) : (
        <section className="space-y-20 px-4 pb-20 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="Todas las prendas"
              subtitle="Vista rápida de la colección"
            />
            <ProductGrid products={products} onAdd={addToCart} />
          </div>

          {sections.map((section) => {
            const sectionProducts = products.filter(
              (product) => product.category === section.filter
            );

            if (!sectionProducts.length) return null;

            return (
              <div key={section.title} className="mx-auto max-w-7xl">
                <SectionHeader
                  title={section.title}
                  subtitle={section.subtitle}
                  Icon={section.icon}
                />
                <ProductGrid products={sectionProducts} onAdd={addToCart} />
              </div>
            );
          })}
        </section>
      )}

      <section className="px-4 pb-10 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-3 rounded-[2rem] bg-white/55 p-4 shadow-xl backdrop-blur md:grid-cols-4">
          <InfoItem icon={Truck} title="Envíos a todo Chile" text="Rápidos" />
          <InfoItem
            icon={ShieldCheck}
            title="Compra protegida"
            text="100% segura"
          />
          <InfoItem
            icon={MessageCircleHeart}
            title="WhatsApp"
            text="Atención directa"
          />
          <InfoItem
            icon={RefreshCw}
            title="Cambios fáciles"
            text="Sin problemas"
          />
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  title,
  subtitle,
  Icon = Sparkles,
}: {
  title: string;
  subtitle: string;
  Icon?: React.ElementType;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-5">
      <div>
        <div className="flex items-center gap-3">
          <Icon className="text-[#bd7284]" size={24} />
          <h2 className="font-serif text-4xl tracking-[-0.05em] md:text-5xl">
            {title}
          </h2>
        </div>

        <p className="mt-2 text-sm text-[#76515b]">{subtitle}</p>
      </div>

      <button className="hidden items-center gap-2 text-xs font-black uppercase tracking-[0.18em] md:flex">
        Ver todo <ArrowRight size={15} />
      </button>
    </div>
  );
}

function ProductGrid({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (product: Product) => void;
}) {
  const { isFavorite, toggleFavorite } = useWishlist();

  if (!products.length) {
    return (
      <div className="rounded-[2rem] bg-white/70 p-10 text-center shadow-xl">
        No hay productos
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => {
        const isSoldOut = (product.stock ?? 0) <= 0;
        const favorite = isFavorite(product.id);

        return (
          <article
            key={product.id}
            className="group overflow-hidden rounded-[1.5rem] bg-white/75 shadow-xl"
          >
            <div className="relative">
              <Link href={`/producto/${product.id}`}>
                <div className="relative h-56 overflow-hidden bg-[#efd1da] sm:h-72">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`h-full w-full object-cover ${
                      isSoldOut ? "grayscale" : ""
                    }`}
                  />
                </div>
              </Link>

              <button
                onClick={() => toggleFavorite(product)}
                className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-md ${
                  favorite
                    ? "bg-[#151313] text-white"
                    : "bg-white/90 text-[#bd7284]"
                }`}
              >
                <Heart size={17} className={favorite ? "fill-white" : ""} />
              </button>
            </div>

            <div className="p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#bd7284]">
                {product.category}
              </p>

              <Link href={`/producto/${product.id}`}>
                <h3 className="mt-1 line-clamp-2 font-serif text-lg md:text-xl">
                  {product.name}
                </h3>
              </Link>

              <p className="mt-2 font-black">{money(product.price)}</p>

              <button
                disabled={isSoldOut}
                onClick={() => !isSoldOut && onAdd(product)}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[10px] font-black uppercase ${
                  isSoldOut
                    ? "bg-[#c9b8b8] text-white/80"
                    : "bg-[#151313] text-white"
                }`}
              >
                {isSoldOut ? "Agotado" : "Comprar"}
                <ShoppingBag size={14} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
function InfoItem({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <article className="flex items-center gap-4 rounded-[1.5rem] bg-white/65 p-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f3c6cf]/45 text-[#bd7284]">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em]">
          {title}
        </p>
        <p className="mt-1 text-sm text-[#76515b]">{text}</p>
      </div>
    </article>
  );
}