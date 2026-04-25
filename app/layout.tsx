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
  title: "El Ropero de Mai | Moda con estilo y prendas seleccionadas",
  description:
    "Descubre prendas para mujeres, hombres y niños en El Ropero de Mai. Moda con estilo, calidad y compra rápida por WhatsApp con envíos disponibles.",
  keywords: [
    "ropa mujer",
    "ropa hombre",
    "ropa niños",
    "tienda de ropa online",
    "moda urbana",
    "parkas",
    "cortavientos",
    "polerones",
    "pantalones",
    "outfits modernos",
    "ropa de temporada",
    "el ropero de mai",
  ],
  authors: [{ name: "El Ropero de Mai" }],
  creator: "El Ropero de Mai",
  publisher: "El Ropero de Mai",
  metadataBase: new URL("https://elroperodemai.vercel.app"),
  openGraph: {
    title: "El Ropero de Mai | Moda con estilo",
    description:
      "Prendas seleccionadas para toda la familia. Compra rápida por WhatsApp.",
    url: "https://elroperodemai.vercel.app",
    siteName: "El Ropero de Mai",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/logo-mai.png",
        width: 1200,
        height: 630,
        alt: "El Ropero de Mai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Ropero de Mai | Moda con estilo",
    description:
      "Moda femenina, masculina e infantil. Compra simple por WhatsApp.",
    images: ["/logo-mai.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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