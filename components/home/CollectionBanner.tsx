"use client";

import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onShop: () => void;
};

export default function CollectionBanner({ onShop }: Props) {
  return (
    <section
      id="ofertas"
      className="relative grid grid-cols-1 overflow-hidden bg-[#f9e6ec] md:grid-cols-[0.85fr_1.15fr]"
    >
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-white/50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#f3c6cf]/50 blur-3xl" />

      <div className="relative z-10 flex items-center px-8 py-20 sm:px-14 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e7b8c3] bg-white/55 px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#9f6472] shadow-sm backdrop-blur">
            <Sparkles size={15} />
            Especial de temporada
          </div>

          <h2 className="font-serif text-6xl uppercase leading-[0.9] tracking-[-0.07em] text-[#151313] md:text-8xl">
            Nueva
          </h2>

          <p className="font-serif text-5xl italic leading-none tracking-[-0.05em] text-[#bd7284] md:text-7xl">
            colección
          </p>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#5f444b]">
            Looks elegantes, femeninos y versátiles para renovar tu clóset con
            una vibra única, delicada y memorable.
          </p>

<button
  onClick={() => window.location.href = "/coleccion"}
  className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#111] px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#2b2421]"
>
  Ver colección <ArrowRight size={18} />
</button>
        </motion.div>
      </div>

      <div className="relative min-h-[430px] overflow-hidden md:min-h-[560px]">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=90"
          alt="Nueva colección ElroperodeMai"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f9e6ec] via-[#f9e6ec]/25 to-transparent" />

        <div className="absolute bottom-10 right-8 hidden rotate-[-4deg] rounded-[2rem] border border-white/50 bg-white/70 px-10 py-8 text-center shadow-2xl backdrop-blur-md md:block">
          <p className="font-serif text-3xl uppercase text-[#151313]">
            Gracias
          </p>
          <p className="font-serif italic text-[#bd7284]">por elegirnos</p>
          <Heart
            className="mx-auto mt-2 fill-[#bd7284] text-[#bd7284]"
            size={16}
          />
        </div>
      </div>
    </section>
  );
}