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

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        <div className="flex justify-center mb-4">
          <img src="/images/logolangkat.png" alt="Logo" className="h-20 w-auto" />
        </div>
        <h2 className="text-3xl font-semibold text-center text-green-700-700 mb-6">
          Daftar Akun
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password (min 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Daftar
        </button>

        <button
          type="button"
          onClick={goToLogin}
          className="mt-4 w-full border border-green-600 text-green-600 font-medium py-2 rounded-lg hover:bg-green-200 transition duration-300"
        >
          Sudah punya akun? Login
        </button>
      </form>
    </div>
  );
}
