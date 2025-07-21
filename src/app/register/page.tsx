"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Gagal parse JSON:", jsonErr);
      }

      if (!res.ok) {
        setError(data?.error || "Registrasi gagal");
        return;
      }

      if (data.redirectTo) {
        router.push(data.redirectTo);
      }
    } catch (err) {
      console.error("Error saat register:", err);
      setError("Terjadi kesalahan saat menghubungi server.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="password"
        placeholder="Password (min 6 karakter)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Daftar
      </button>
    </form>
  );
}
