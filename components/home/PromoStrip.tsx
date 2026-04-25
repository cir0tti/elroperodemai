import {
  Sparkles,
  Truck,
  ShieldCheck,
  MessageCircleHeart,
  Gift,
} from "lucide-react";

const items = [
  { icon: Truck, text: "Envíos a todo Chile" },
  { icon: Sparkles, text: "Nueva colección disponible" },
  { icon: ShieldCheck, text: "Compra segura" },
  { icon: MessageCircleHeart, text: "Atención por WhatsApp" },
  { icon: Gift, text: "Prendas seleccionadas" },
];

export default function PromoStrip() {
  return (
    <section className="relative w-full max-w-full overflow-hidden bg-[#111] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#f3c6cf26,transparent_55%)]" />

      <div className="relative w-full max-w-full overflow-hidden border-b border-white/10 py-3">
        <div className="w-full max-w-full overflow-hidden md:hidden">
          <div className="promo-marquee flex w-max min-w-max gap-6 px-5">
            {[...items, ...items, ...items, ...items].map((item, index) => {
              const Icon = item.icon;

              return (
                <span
                  key={index}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.18em]"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f3c6cf]/15">
                    <Icon size={13} className="text-[#f3c6cf]" />
                  </span>
                  {item.text}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mx-auto hidden max-w-7xl items-center justify-center gap-5 overflow-hidden px-5 text-center md:flex">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.text} className="flex min-w-0 items-center gap-5">
                <span className="flex items-center gap-2 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f3c6cf]/15 ring-1 ring-[#f3c6cf]/20">
                    <Icon size={14} className="text-[#f3c6cf]" />
                  </span>
                  {item.text}
                </span>

                {index < items.length - 1 && (
                  <span className="h-5 w-px shrink-0 bg-white/15" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}