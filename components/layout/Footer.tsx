import { Heart, MessageCircleHeart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#100d0c] px-5 py-14 text-[#f4d7d2] md:px-10">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#e9c2bd]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#f3c6cf]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-md md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f3c6cf]">
              <Sparkles size={14} />
              Moda seleccionada con cariño
            </div>

            <p className="font-serif text-3xl italic tracking-wide md:text-4xl">
              Gracias por ser parte de
            </p>

            <h2 className="mt-2 font-serif text-5xl tracking-[-0.06em] text-white md:text-7xl">
              ElroperodeMai ♡
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              Prendas cómodas, lindas y elegidas para que encuentres ese look que
              realmente va contigo.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 md:items-end md:text-right">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-white">
                Síguenos
              </p>

              <div className="flex gap-3 md:justify-end">
                {["IG", "TT", "FB", "PI"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="grid h-11 w-11 place-items-center rounded-full bg-[#f4d7d2] text-xs font-black text-[#100d0c] shadow-lg transition hover:-translate-y-1 hover:bg-white"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/56932898601"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#100d0c] transition hover:-translate-y-1 hover:bg-[#f4d7d2]"
            >
              <MessageCircleHeart size={18} />
              Comprar por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center text-xs text-white/45 md:flex-row">
          <p>© 2026 ElroperodeMai. Todos los derechos reservados.</p>

          <p className="inline-flex items-center gap-2">
            Hecho con <Heart size={13} className="fill-[#f3c6cf] text-[#f3c6cf]" /> para vestir bonito
          </p>
        </div>
      </div>
    </footer>
  );
}