"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Contraseña incorrecta");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f9e6ec] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[2rem] bg-white/70 p-8 shadow-xl backdrop-blur"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#bd7284]">
          Panel privado
        </p>

        <h1 className="mt-3 font-serif text-5xl">Admin Mai</h1>

        <input
          type="password"
          placeholder="Contraseña admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-8 w-full rounded-2xl bg-white px-5 py-4 outline-none"
        />

        {error && <p className="mt-3 text-sm font-bold text-red-500">{error}</p>}

        <button className="mt-6 w-full rounded-full bg-[#151313] py-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
          Entrar
        </button>
      </form>
    </main>
  );
}