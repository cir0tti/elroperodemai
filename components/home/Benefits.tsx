import {
  PackageCheck,
  Crown,
  ShieldCheck,
  MessageCircleHeart,
  Sparkles,
} from "lucide-react";
import { benefits } from "@/lib/data";

const icons = [
  PackageCheck,
  Crown,
  ShieldCheck,
  MessageCircleHeart,
];

export default function Benefits() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[#fbf6f2] px-4 py-16 md:px-10 md:py-24"
    >
      {/* fondos premium */}
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-[#f3c6cf]/25 blur-3xl" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[#e8d8ff]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f0d9de] bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#bd7284] shadow-sm">
            <Sparkles size={14} />
            ¿Por qué elegirnos?
          </div>

          <h2 className="mt-5 font-serif text-4xl leading-[0.95] tracking-[-0.05em] text-[#151313] md:text-6xl">
            Experiencia premium
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6b5a57] md:text-base">
            Diseñado para que comprar sea fácil, rápida y con confianza total.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = icons[index];

            return (
              <article
                key={benefit.title}
                className="group rounded-[2rem] border border-white/70 bg-white/70 p-7 text-center shadow-[0_18px_45px_rgba(104,76,84,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(104,76,84,0.14)]"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f9e6ec] text-[#bd7284] ring-1 ring-[#f3c6cf]/50 transition group-hover:scale-105">
                  <Icon size={28} strokeWidth={1.7} />
                </div>

                <h3 className="mt-6 text-sm font-black uppercase tracking-[0.14em] text-[#151313]">
                  {benefit.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[230px] text-sm leading-relaxed text-[#6b5a57]">
                  {benefit.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}