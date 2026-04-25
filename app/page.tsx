"use client";

import { useMemo, useState } from "react";
import PromoStrip from "@/components/home/PromoStrip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LuxuryCTA from "@/components/home/LuxuryCTA";
import MobileMenu from "@/components/layout/MobileMenu";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/layout/CartDrawer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import ProductSection from "@/components/home/ProductSection";
import CollectionBanner from "@/components/home/CollectionBanner";
import Benefits from "@/components/home/Benefits";

import { createWhatsappOrderMessage, CheckoutData } from "@/lib/checkout";
import { whatsappNumber } from "@/lib/data";
import { Product } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const { products } = useProducts();

  const {
    cart,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQty,
    removeItem,
  } = useCart();

  const previewProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return previewProducts.filter((product) => {
      const search = product.name.toLowerCase().includes(query.toLowerCase());
      const category =
        activeCategory === "Todos" || product.category === activeCategory;

      return search && category;
    });
  }, [previewProducts, query, activeCategory]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function checkout(data: CheckoutData) {
    const text = createWhatsappOrderMessage(cart, data);

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f9e6ec] pb-24 text-[#151313] md:pb-0">
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={scrollTo}
      />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onUpdate={updateQty}
        onCheckout={checkout}
      />

      <PromoStrip />

      <Header
        cartCount={cartCount}
        query={query}
        onQuery={setQuery}
        onMenu={() => setMenuOpen(true)}
        onCart={() => setCartOpen(true)}
        onNavigate={scrollTo}
      />

      <Hero onShop={() => scrollTo("novedades")} />

      <Categories
        activeCategory={activeCategory}
        onSelect={(category) => {
          setActiveCategory(category);
          scrollTo("novedades");
        }}
      />

      <ProductSection
        products={filteredProducts}
        activeCategory={activeCategory}
        onCategory={setActiveCategory}
        onAdd={(product: Product) => addToCart(product)}
      />

      <CollectionBanner onShop={() => scrollTo("novedades")} />

      <Benefits />

      <LuxuryCTA onShop={() => scrollTo("novedades")} />

      <Footer />

    </main>
  );
}