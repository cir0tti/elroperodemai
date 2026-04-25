export function money(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value);
}

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  tag?: string;
  image: string;
  gallery: string[];
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
};

export type CartItem = Product & {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};