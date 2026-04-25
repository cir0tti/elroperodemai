"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type Props = {
  onShop: () => void;
};

const looks = [
  {
    title: "Soft Luxury",
    subtitle: "Elegancia diaria",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90",
    desc: "Un look delicado y femenino para destacar con naturalidad.",
  },
  {
    title: "City Chic",
    subtitle: "Actitud moderna",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",
    desc: "Perfecto para salidas, trabajo o una cita especial.",
  },
  {
    title: "Golden Sunset",
    subtitle: "Romántico premium",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=90",
    desc: "Un outfit pensado para robar miradas.",
  },
];

export default function StyledLooks({ onShop }: Props) {
  return (
    <section className="bg-[#fff6f8] px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#bd7284] shadow-sm">
            <Sparkles size={14} />
            Looks exclusivos
          </div>

          <h2 className="mt-6 font-serif text-5xl tracking-[-0.06em] md:text-7xl">
            Armados por Mai
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#6d5751]">
            Inspiraciones completas listas para comprar. Combina estilo,
            elegancia y actitud en segundos.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {looks.map((look, index) => (
            <motion.article
              key={look.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-xl"
            >
              <div className="relative h-[480px] overflow-hidden">
                <img
                  src={look.image}
                  alt={look.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 p-7 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f3c6cf]">
                    {look.subtitle}
                  </p>

                  <h3 className="mt-2 font-serif text-4xl">{look.title}</h3>

                  <p className="mt-3 max-w-sm text-white/80">
                    {look.desc}
                  </p>

                  <button
                    onClick={onShop}
                    className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#111] transition hover:-translate-y-1"
                  >
                    Comprar look <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}