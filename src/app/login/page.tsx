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

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (!res.ok) {
      setError(data.error || "Login gagal");
      return;
    }

    // ✅ Simpan status login ke localStorage
    if (data.role === "user") {
      localStorage.setItem("isUserLoggedIn", "true");
      localStorage.setItem("userEmail", data.email); // dari backend
      localStorage.setItem("userId", data.id); // dari backend
    }

    if (data.role === "admin") {
      localStorage.setItem("isAdminLoggedIn", "true");
    }

    // ✅ Redirect ke halaman yang sesuai
    if (data.redirectTo) {
      window.location.href = data.redirectTo;
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        type="text"
        placeholder="ID Admin atau Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full p-2 border rounded mb-3 text-color-black"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>

      <button
        type="button"
        onClick={goToRegister}
        className="mt-3 w-full text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50"
      >
        Belum punya akun? Register
      </button>
    </form>
  );
}
