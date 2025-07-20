"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  MapPin,
  Package,
  LogIn,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import clsx from "clsx";

// Daftar menu navigasi
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Beranda", href: "/", icon: Home },
  { label: "Peta", href: "/peta", icon: MapPin },
  { label: "Produk Unggulan", href: "/produk-unggulan", icon: Package },
];

export default function Navbar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [fontSize, setFontSize] = useState("base");

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "sm" ? "14px" : fontSize === "lg" ? "18px" : "16px";
  }, [fontSize]);

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 h-screen bg-white shadow-lg border-r transition-all duration-300 ease-in-out z-[9999]",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        {!collapsed ? (
          <span className="text-lg font-bold text-blue-700">Desa Digital</span>
        ) : (
          <span className="text-blue-700 font-bold text-sm">DD</span>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-blue-600"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 p-2 rounded-md text-sm transition group",
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              )}
              title={collapsed ? label : ""}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Auth Buttons */}
      <div className="mt-auto p-3 flex flex-col gap-2 border-t">
        <Link
          href="/login"
          className="flex items-center gap-2 p-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          title={collapsed ? "Login" : ""}
        >
          <LogIn size={18} />
          {!collapsed && <span>Login</span>}
        </Link>
        <Link
          href="/register"
          className="flex items-center gap-2 p-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          title={collapsed ? "Register" : ""}
        >
          <UserPlus size={18} />
          {!collapsed && <span>Register</span>}
        </Link>
      </div>

      {/* Font Size Controls */}
      <div className="absolute bottom-5 right-5 bg-white rounded shadow text-sm">
        <div className="flex border">
          <button
            onClick={() => setFontSize("sm")}
            className="px-2 py-1 border-r hover:bg-gray-100"
          >
            A-
          </button>
          <button
            onClick={() => setFontSize("base")}
            className="px-2 py-1 border-r hover:bg-gray-100"
          >
            A
          </button>
          <button
            onClick={() => setFontSize("lg")}
            className="px-2 py-1 hover:bg-gray-100"
          >
            A+
          </button>
        </div>
      </div>
    </aside>
  );
}
