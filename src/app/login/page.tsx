"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Penting untuk kirim cookie ke browser
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      if (data.role === "user") {
        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userId", data.id);
      }

      if (data.redirectTo) {
        router.push(data.redirectTo);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat login");
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        <div className="flex justify-center mb-5">
          <img
            src="/images/langkat.png"
            alt="Langkat Icon"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>

        

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700">
            ID atau Email
          </label>
          <input
            type="text"
            placeholder="Masukkan ID / Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Login
        </button>

        <button
          type="button"
          onClick={goToRegister}
          className="mt-4 w-full border border-blue-600 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition duration-300"
        >
          Belum punya akun? Daftar
        </button>
      </form>
    </div>
  );
}
