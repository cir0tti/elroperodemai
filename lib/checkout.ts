import { CartItem, money } from "@/lib/format";

export type CheckoutData = {
  name: string;
  phone: string;
  commune: string;
  address: string;
  deliveryType: "Envío" | "Retiro";
  note: string;
};

export function createOrderCode() {
  return `MAI-${Date.now().toString().slice(-6)}`;
}

export function createWhatsappOrderMessage(
  cart: CartItem[],
  data?: CheckoutData
) {
  const orderCode = createOrderCode();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const products = cart
    .map((item) => {
      const details = [
        item.selectedSize ? `Talla: ${item.selectedSize}` : "",
        item.selectedColor ? `Color: ${item.selectedColor}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      return `• ${item.name} x${item.quantity} - ${money(
        item.price * item.quantity
      )}${details ? ` (${details})` : ""}`;
    })
    .join("\n");

  const customerData = data
    ? `

Datos del cliente:
Nombre: ${data.name}
Teléfono: ${data.phone}
Comuna: ${data.commune}
Dirección: ${data.address}
Entrega: ${data.deliveryType}
Nota: ${data.note || "Sin nota"}`
    : "";

  return encodeURIComponent(`🛍️ Nuevo pedido ${orderCode} - El Ropero de Mai

Hola, quiero realizar este pedido:

${products}

Total: ${money(total)}
${customerData}

Quedo atent@ para confirmar disponibilidad.`);
}