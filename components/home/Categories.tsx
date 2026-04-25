import { categories } from "@/lib/data";
import { Heart } from "lucide-react";

type Props = {
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function Categories({
  activeCategory,
  onSelect,
}: Props) {
  return (
    <section
      id="ropa"
      className="bg-[#fbf6f2] px-5 py-14 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl uppercase tracking-[0.16em]">
          Descubre tu favorito ♡
        </h2>

        {/* CONTENEDOR CENTRADO */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-10">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelect(category.name)}
              className="group w-[145px] text-center sm:w-[180px]"
            >
              <div
                className={`mx-auto h-32 w-32 overflow-hidden rounded-full shadow-lg ring-2 transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl sm:h-40 sm:w-40 ${
                  activeCategory === category.name
                    ? "ring-[#111]"
                    : "ring-[#eadad4]"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em]">
                {category.name}
              </h3>

              <div className="mx-auto mt-2 h-px w-16 bg-[#c8958e]" />

              <Heart
                size={14}
                className="mx-auto mt-3 fill-[#c8958e] text-[#c8958e]"
              />
            </button>
          ))}

          {/* BOTÓN TODOS */}
          <button
            onClick={() => onSelect("Todos")}
            className="group w-[145px] text-center sm:w-[180px]"
          >
            <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-[#e8c7c2] shadow-lg transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl sm:h-40 sm:w-40">
              <div>
                <p className="font-serif text-xl uppercase text-[#6d4d49] sm:text-2xl">
                  Ofertas
                </p>

                <p className="font-serif text-lg italic text-[#8f6762]">
                  especiales
                </p>

                <p className="text-[#8f6762]">♡ ♡</p>
              </div>
            </div>

            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em]">
              Todos
            </h3>

            <div className="mx-auto mt-2 h-px w-16 bg-[#c8958e]" />

            <Heart
              size={14}
              className="mx-auto mt-3 fill-[#c8958e] text-[#c8958e]"
            />
          </button>
        </div>
      </div>
    </section>
  );
}