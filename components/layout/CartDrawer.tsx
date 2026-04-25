"use client";

import { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { CartItem, money } from "@/lib/format";
import { CheckoutData } from "@/lib/checkout";

type Props = {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, amount: number) => void;
  onCheckout: (data: CheckoutData) => void;
};

export default function CartDrawer({
  open,
  cart,
  onClose,
  onRemove,
  onUpdate,
  onCheckout,
}: Props) {
  const [form, setForm] = useState<CheckoutData>({
    name: "",
    phone: "",
    commune: "",
    address: "",
    deliveryType: "Envío",
    note: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    commune: false,
    address: false,
  });

  const [toast, setToast] = useState(false);
  const [shake, setShake] = useState(false);

  if (!open) return null;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  function handleCheckout() {
    const newErrors = {
      name: !form.name.trim(),
      phone: !form.phone.trim(),
      commune: !form.commune.trim(),
      address: form.deliveryType === "Envío" ? !form.address.trim() : false,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      setToast(true);
      setShake(true);

      setTimeout(() => setToast(false), 2800);
      setTimeout(() => setShake(false), 500);

      document
        .getElementById("checkout-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    }

    onCheckout(form);
  }

  function inputClass(error: boolean) {
    return `rounded-2xl px-4 py-3 text-sm outline-none transition ${
      error
        ? "bg-red-50 ring-2 ring-red-400"
        : "bg-[#fbf6f2] focus:ring-2 focus:ring-[#e5bcb7]"
    }`;
  }

  return (
    <div className="fixed inset-0 z-[999]">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
      />

      <aside className="absolute bottom-0 left-0 right-0 max-h-[90vh] rounded-t-[2rem] bg-[#fbf6f2] shadow-2xl md:bottom-auto md:left-auto md:top-0 md:h-full md:max-h-none md:w-full md:max-w-md md:rounded-none">
        <div className="flex h-full max-h-[90vh] flex-col md:max-h-none">
          <div className="mx-auto mt-3 h-1.5 w-14 rounded-full bg-[#d8b8b0] md:hidden" />

          <div className="flex items-center justify-between border-b border-[#dfc5bd] px-5 py-5 md:px-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#bd7284]">
                Bolsa de compra
              </p>
              <h2 className="font-serif text-3xl">Tu carrito</h2>
              <p className="text-sm text-[#6d5751]">
                {totalItems} producto(s)
              </p>
            </div>

            <button
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6">
            {cart.length === 0 ? (
              <div className="grid min-h-[340px] place-items-center text-center text-[#6d5751]">
                <div>
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-sm">
                    <ShoppingBag className="text-[#bd7284]" size={36} />
                  </div>

                  <p className="mt-5 font-serif text-3xl text-[#151313]">
                    Tu carrito está vacío
                  </p>

                  <p className="mt-2 text-sm">
                    Agrega una prenda para iniciar tu pedido.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[82px_1fr] gap-4 rounded-[1.4rem] bg-white p-3 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-[82px] rounded-[1rem] object-cover"
                    />

                    <div>
                      <h3 className="font-serif text-xl">{item.name}</h3>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border px-3 py-2">
                          <button onClick={() => onUpdate(item.id, -1)}>
                            <Minus size={13} />
                          </button>

                          <span className="font-black">
                            {item.quantity}
                          </span>

                          <button onClick={() => onUpdate(item.id, 1)}>
                            <Plus size={13} />
                          </button>
                        </div>

                        <button onClick={() => onRemove(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="mt-3 font-black">
                        {money(item.price * item.quantity)}
                      </p>
                    </div>
                  </article>
                ))}

                <div
                  id="checkout-form"
                  className={`rounded-[1.4rem] bg-white p-4 shadow-sm ${
                    shake ? "animate-pulse" : ""
                  }`}
                >
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#bd7284]">
                    Datos para coordinar
                  </p>

                  {toast && (
                    <div className="mb-4 rounded-2xl bg-[#f8d7de] px-4 py-3 text-sm font-semibold text-[#8b3a4a]">
                      Completa tus datos para continuar ✨
                    </div>
                  )}

                  <div className="grid gap-3">
                    <input
                      placeholder="Nombre"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={inputClass(errors.name)}
                    />

                    <input
                      placeholder="Teléfono"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className={inputClass(errors.phone)}
                    />

                    <input
                      placeholder="Comuna"
                      value={form.commune}
                      onChange={(e) =>
                        setForm({ ...form, commune: e.target.value })
                      }
                      className={inputClass(errors.commune)}
                    />

                    <input
                      placeholder="Dirección"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      className={inputClass(errors.address)}
                    />

                    <select
                      value={form.deliveryType}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryType: e.target.value as
                            | "Envío"
                            | "Retiro",
                        })
                      }
                      className="rounded-2xl bg-[#fbf6f2] px-4 py-3 text-sm outline-none"
                    >
                      <option value="Envío">Envío</option>
                      <option value="Retiro">Retiro</option>
                    </select>

                    <textarea
                      placeholder="Nota opcional"
                      value={form.note}
                      onChange={(e) =>
                        setForm({ ...form, note: e.target.value })
                      }
                      className="min-h-20 rounded-2xl bg-[#fbf6f2] px-4 py-3 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[#dfc5bd] bg-[#fbf6f2] px-5 py-5 md:px-6">
            <div className="mb-4 rounded-[1.3rem] bg-white p-4 shadow-sm">
              <div className="flex justify-between text-sm text-[#6d5751]">
                <span>Total</span>
                <span className="font-black">{money(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#151313] py-4 text-xs font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#2b2421] disabled:opacity-40"
            >
              Finalizar por WhatsApp
              <MessageCircle size={18} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}