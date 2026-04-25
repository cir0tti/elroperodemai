"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { navItems } from "@/lib/data";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export default function MobileMenu({
  open,
  onClose,
  onNavigate,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-[#111] p-7 text-white shadow-2xl lg:hidden"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-serif text-3xl">ElroperodeMai</p>
          <p className="text-xs uppercase tracking-[0.3em] text-[#e7b8b4]">
            Tu estilo
          </p>
        </div>

        <button onClick={onClose} aria-label="Cerrar menú">
          <X />
        </button>
      </div>

      <nav className="mt-12 flex flex-col gap-5 text-lg uppercase tracking-[0.16em]">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() =>
              onNavigate(item === "Inicio" ? "inicio" : item.toLowerCase())
            }
            className="border-b border-white/10 pb-4 text-left transition hover:text-[#e7b8b4]"
          >
            {item}
          </button>
        ))}
      </nav>
    </motion.aside>
  );
}