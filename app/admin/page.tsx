"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Package,
  ImageIcon,
  Pencil,
  X,
  Save,
  Boxes,
  Upload,
} from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { money, Product } from "@/lib/format";
import { uploadProductImage } from "@/lib/supabase/uploadImage";

const categories = [
  "Novedades",
  "Parkas",
  "Cortavientos",
  "Pantalones",
  "Polar",
  "Accesorios",
];

const emptyForm = {
  name: "",
  category: "Parkas",
  price: "",
  stock: "1",
  tag: "Nuevo",
  image: "",
  gallery: "",
  description: "",
  sizes: "S,M,L,XL",
  colors: "Negro",
};

const inputClass =
  "w-full min-w-0 rounded-2xl bg-white px-4 py-4 text-sm outline-none sm:px-5";

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const isEditing = editingId !== null;

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMainFile(null);
    setGalleryFiles([]);
  }

  function handleEdit(product: Product) {
    setEditingId(product.id);

    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock ?? 1),
      tag: product.tag ?? "",
      image: product.image,
      gallery: product.gallery?.join(", ") ?? "",
      description: product.description,
      sizes: product.sizes?.join(", ") ?? "",
      colors: product.colors?.join(", ") ?? "",
    });

    setMainFile(null);
    setGalleryFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setUploading(true);

      let mainImageUrl = form.image;
      let galleryUrls = form.gallery
        ? form.gallery
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean)
        : [];

      if (mainFile) {
        mainImageUrl = await uploadProductImage(mainFile);
      }

      if (galleryFiles.length > 0) {
        galleryUrls = await Promise.all(
          galleryFiles.map((file) => uploadProductImage(file))
        );
      }

      if (!galleryUrls.length) {
        galleryUrls = [mainImageUrl];
      }

      const product: Product = {
        id: editingId ?? Date.now(),
        slug: form.name.toLowerCase().trim().replaceAll(" ", "-"),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        tag: form.tag,
        image: mainImageUrl,
        gallery: galleryUrls,
        description: form.description,
        sizes: form.sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean),
        colors: form.colors
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean),
      };

      if (isEditing && editingId !== null) {
        await updateProduct(editingId, product);
      } else {
        await addProduct(product);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert("Error subiendo imágenes o guardando producto.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f9e6ec] px-4 py-6 text-[#151313] md:px-10 md:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex max-w-full items-center gap-2 rounded-full bg-white/70 px-5 py-3 text-sm font-bold text-[#76515b] shadow-sm"
        >
          <ArrowLeft size={18} />
          <span className="truncate">Volver a la tienda</span>
        </Link>

        <div className="mb-8 md:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#bd7284]">
            Panel administrador
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-none tracking-[-0.05em] sm:text-5xl md:text-7xl">
            Gestionar productos
          </h1>
        </div>

        <section className="grid w-full min-w-0 gap-6 lg:grid-cols-[0.85fr_1.35fr] lg:items-start lg:gap-8">
          <form
            onSubmit={handleSubmit}
            className="w-full min-w-0 rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-xl backdrop-blur sm:p-6 md:rounded-[2rem] lg:sticky lg:top-6"
          >
            <div className="mb-6 flex min-w-0 items-center justify-between gap-4">
              <h2 className="flex min-w-0 items-center gap-2 font-serif text-3xl leading-tight">
                {isEditing ? (
                  <Pencil className="shrink-0 text-[#bd7284]" />
                ) : (
                  <Plus className="shrink-0 text-[#bd7284]" />
                )}
                <span className="truncate">
                  {isEditing ? "Editar prenda" : "Nueva prenda"}
                </span>
              </h2>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#151313] text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="grid min-w-0 gap-4">
              <input
                required
                placeholder="Nombre de la prenda"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                <input
                  required
                  type="number"
                  placeholder="Precio"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={inputClass}
                />

                <input
                  required
                  min={0}
                  type="number"
                  placeholder="Stock disponible"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className={inputClass}
                />
              </div>

              <input
                placeholder="Etiqueta: Nuevo, Premium..."
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className={inputClass}
              />

              <label className="min-w-0 rounded-2xl border border-dashed border-[#bd7284]/40 bg-white/70 p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3 font-bold text-[#76515b]">
                  <Upload size={18} className="shrink-0" />
                  <span className="truncate">Imagen principal</span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMainFile(e.target.files?.[0] ?? null)}
                  className="mt-3 block w-full max-w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-[#151313] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white sm:text-sm"
                />

                {mainFile && (
                  <p className="mt-2 max-w-full truncate text-xs font-bold text-[#bd7284]">
                    {mainFile.name}
                  </p>
                )}
              </label>

              <input
                placeholder="O pega URL de imagen principal"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className={inputClass}
              />

              <label className="min-w-0 rounded-2xl border border-dashed border-[#bd7284]/40 bg-white/70 p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3 font-bold text-[#76515b]">
                  <Upload size={18} className="shrink-0" />
                  <span className="truncate">Galería de imágenes</span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setGalleryFiles(Array.from(e.target.files ?? []))
                  }
                  className="mt-3 block w-full max-w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-[#151313] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white sm:text-sm"
                />

                {galleryFiles.length > 0 && (
                  <p className="mt-2 text-xs font-bold text-[#bd7284]">
                    {galleryFiles.length} imágenes seleccionadas
                  </p>
                )}
              </label>

              <input
                placeholder="O pega URLs de galería separadas por coma"
                value={form.gallery}
                onChange={(e) => setForm({ ...form, gallery: e.target.value })}
                className={inputClass}
              />

              <textarea
                required
                placeholder="Descripción"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="min-h-28 w-full min-w-0 resize-y rounded-2xl bg-white px-4 py-4 text-sm outline-none sm:px-5"
              />

              <input
                placeholder="Tallas separadas por coma"
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                className={inputClass}
              />

              <input
                placeholder="Colores separados por coma"
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                className={inputClass}
              />

              <button
                disabled={uploading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#151313] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-60 sm:text-sm"
              >
                {uploading ? (
                  "Subiendo..."
                ) : isEditing ? (
                  <>
                    <Save size={18} />
                    Guardar cambios
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Guardar producto
                  </>
                )}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-[#151313]/10 bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#151313] sm:text-sm"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>

          <div className="w-full min-w-0 rounded-[1.5rem] border border-white/70 bg-white/55 p-4 shadow-xl backdrop-blur sm:p-6 md:rounded-[2rem]">
            <h2 className="mb-6 flex min-w-0 items-center gap-2 font-serif text-3xl leading-tight">
              <Package className="shrink-0 text-[#bd7284]" />
              <span className="truncate">Productos actuales</span>
            </h2>

            <div className="grid min-w-0 gap-4">
              {products.map((product) => {
                const stock = product.stock ?? 0;

                return (
                  <article
                    key={product.id}
                    className="grid min-w-0 grid-cols-[76px_1fr_44px] gap-3 rounded-2xl bg-white/80 p-3 shadow-sm sm:grid-cols-[88px_1fr_auto] sm:gap-4 sm:p-4"
                  >
                    <div className="grid h-24 w-[76px] shrink-0 place-items-center overflow-hidden rounded-xl bg-[#f3c6cf]/40 sm:w-20">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-[#bd7284] sm:text-xs">
                        {product.category}
                      </p>

                      <h3 className="line-clamp-2 break-words font-serif text-lg leading-tight sm:text-2xl">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm font-bold sm:text-base">
                        {money(product.price)}
                      </p>

                      <div
                        className={`mt-2 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold ${
                          stock <= 0
                            ? "bg-red-100 text-red-700"
                            : stock <= 2
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        <Boxes size={14} className="shrink-0" />
                        <span className="truncate">
                          {stock <= 0 ? "Agotado" : `Stock: ${stock}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="grid h-10 w-10 place-items-center rounded-full bg-[#f3c6cf] text-[#151313] sm:h-11 sm:w-11"
                        aria-label="Editar producto"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="grid h-10 w-10 place-items-center rounded-full bg-[#151313] text-white sm:h-11 sm:w-11"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}