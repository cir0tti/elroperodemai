"use client";

import {
  ArrowRight,
  Heart,
  MessageCircleHeart,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onShop: () => void;
};

export default function LuxuryCTA({ onShop }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#fff7f4] px-4 py-16 sm:px-6 md:px-10 md:py-24">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f3c6cf]/50 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#ffd9c8]/60 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#15110f] shadow-[0_30px_90px_rgba(0,0,0,0.22)] md:rounded-[3rem]"
      >
        <div className="grid lg:grid-cols-[1fr_0.95fr]">
          {/* TEXTO */}
          <div className="relative z-10 p-7 text-white sm:p-10 md:p-14 lg:p-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffd1dc] backdrop-blur-md sm:text-xs">
              <Sparkles size={14} />
              Nueva selección premium
            </div>

            <h2 className="max-w-2xl font-serif text-4xl leading-[0.95] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl">
              Viste cómodo, bonito y con estilo todos los días.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">
              Prendas seleccionadas para mujer, hombre y niños. Looks versátiles,
              cómodos y listos para combinar en cualquier ocasión.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <Truck className="mb-3 text-[#ffd1dc]" size={22} />
                <p className="text-sm font-semibold">Envíos a Chile</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <ShieldCheck className="mb-3 text-[#ffd1dc]" size={22} />
                <p className="text-sm font-semibold">Compra segura</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <Heart className="mb-3 fill-[#ffd1dc] text-[#ffd1dc]" size={22} />
                <p className="text-sm font-semibold">Prendas únicas</p>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onShop}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ffd1dc] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#15110f] shadow-lg shadow-[#ffd1dc]/20 transition hover:-translate-y-1 hover:bg-white sm:text-sm"
              >
                Ver productos
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={onShop}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#15110f] sm:text-sm"
              >
                Pedir asesoría
                <MessageCircleHeart size={18} />
              </button>
            </div>
          </div>

          {/* IMAGEN */}
          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=90"
              alt="Moda seleccionada El Ropero de Mai"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#15110f] via-[#15110f]/20 to-transparent lg:bg-gradient-to-r lg:from-[#15110f] lg:via-[#15110f]/20 lg:to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/25 bg-white/85 p-5 text-[#15110f] shadow-2xl backdrop-blur-md sm:bottom-8 sm:left-auto sm:right-8 sm:max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#b77973]">
                Atención directa
              </p>
              <p className="mt-1 font-serif text-2xl leading-tight">
                Compra fácil por WhatsApp
              </p>
              <p className="mt-2 text-sm text-black/60">
                Te ayudamos con tallas, disponibilidad y despacho.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}