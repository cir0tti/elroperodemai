"use client";

import { Heart, Sparkles, Truck } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onShop: () => void;
};

export default function Hero({ onShop }: Props) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff6f8_0%,#f9e6ec_45%,#f3d8e0_100%)]"
    >
<div className="absolute left-0 top-0 hidden rounded-br-[2rem] bg-[#0f0f0f] px-10 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-2xl md:block">
  <div className="flex items-center gap-3">
    <Sparkles size={18} className="text-[#f3c6cf]" />
    Brilla con estilo único hoy
  </div>
</div>

      <div className="absolute left-10 top-40 hidden h-72 w-72 rounded-full bg-[#e9c2bd]/30 blur-3xl lg:block" />
      <div className="absolute bottom-10 right-10 hidden h-96 w-96 rounded-full bg-white/50 blur-3xl lg:block" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="relative z-10 text-center md:text-left"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#e4c5bd] bg-white/60 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#8d6c64] backdrop-blur md:mx-0">
            <Sparkles size={15} />
            Nueva temporada
          </div>

          <h2 className="font-serif text-6xl uppercase leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Viste tu <br /> mejor
          </h2>

          <p className="-mt-1 font-serif text-6xl italic leading-none tracking-[-0.06em] text-[#ba8580] sm:text-7xl lg:text-8xl">
            versión
          </p>

          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-[#3d3432] md:mx-0 md:text-2xl">
            Ropa que te acompaña, estilo que te representa y outfits que hablan por ti.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <button
              onClick={onShop}
              className="inline-flex items-center gap-5 bg-[#111] px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#2b2421]"
            >
              Comprar ahora <Heart size={20} className="text-[#e1b4af]" />
            </button>

            <button
              onClick={onShop}
              className="text-sm font-bold uppercase tracking-[0.18em] text-[#7d5f58] underline-offset-8 transition hover:text-black hover:underline"
            >
              Ver colección
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative min-h-[460px] overflow-hidden rounded-t-[12rem] bg-[#dfd0c6] shadow-2xl md:min-h-[650px]"
        >
          <img
            src="https://i.postimg.cc/3rXXdvKZ/Whats-App-Image-2026-04-23-at-20-imgupscaler-ai-Beta-2K-(1).png"
            alt="Modelo ElroperodeMai"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f0eb]/20 via-transparent to-[#f7f0eb]/10" />

          <div className="absolute bottom-8 left-8 rounded-3xl bg-white/70 p-5 shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d6c64]">
              Outfit destacado
            </p>
            <p className="mt-1 font-serif text-2xl">Parka The North Face</p>
          </div>

          <div className="absolute right-8 top-28 hidden h-36 w-36 place-items-center rounded-full border border-[#8c756a]/60 bg-[#f8eee8]/45 text-center backdrop-blur-sm md:grid">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#6d5751]">
                ERDM
              </p>
              <p className="mt-2 font-serif text-2xl font-bold">Mai</p>
              <Heart className="mx-auto mt-2 fill-[#c18f89] text-[#c18f89]" size={16} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}