"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/format";
import { supabase } from "@/lib/supabase/client";

type ProductContextType = {
  products: Product[];
  loading: boolean;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: number, product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando productos:", error.message);
      setLoading(false);
      return;
    }

    setProducts((data ?? []) as Product[]);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function addProduct(product: Product) {
    const { id, ...productData } = product;

    const { error } = await supabase.from("products").insert(productData);

    if (error) {
      console.error("Error agregando producto:", error.message);
      return;
    }

    await loadProducts();
  }

  async function updateProduct(id: number, product: Product) {
    const { id: _id, ...productData } = product;

    const { error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id);

    if (error) {
      console.error("Error editando producto:", error.message);
      return;
    }

    await loadProducts();
  }

  async function deleteProduct(id: number) {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error eliminando producto:", error.message);
      return;
    }

    await loadProducts();
  }

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts debe usarse dentro de ProductProvider");
  }

  return context;
}