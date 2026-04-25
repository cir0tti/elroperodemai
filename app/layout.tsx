import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ProductProvider } from "@/context/ProductContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElroperodeMai | Moda con estilo",
  description:
    "Tienda online de ropa para mujeres, hombres y niños. Compra fácil por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body className="min-h-full flex flex-col bg-[#f9e6ec] text-[#151313]">
<ProductProvider>
  <WishlistProvider>
    <CartProvider>{children}</CartProvider>
  </WishlistProvider>
</ProductProvider>
</body>
    </html>
  );
}