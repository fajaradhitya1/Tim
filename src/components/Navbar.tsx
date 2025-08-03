"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  MapPin,
  Package,
  LogIn,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  X,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Beranda", href: "/", icon: Home },
  { label: "Peta", href: "/peta", icon: MapPin },
  { label: "Produk Unggulan", href: "/produk-unggulan", icon: Package },
];

export default function Navbar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const [fontSize, setFontSize] = useState("base");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "sm" ? "14px" : fontSize === "lg" ? "18px" : "16px";
  }, [fontSize]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      {/* Tombol Logo Mobile */}
      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-50 bg-blue-700 text-white px-5 py-2 shadow-md font-semibold text-sm flex items-center justify-center block md:hidden"
        style={{ borderRadius: "9999px" }}
        aria-label="Toggle menu"
      >
        Menu
      </button>

      {/* Sidebar Desktop */}
      <aside
        className={clsx(
          "bg-white shadow-lg border-r fixed top-0 left-0 h-screen z-[9999] transition-all duration-300 ease-in-out",
          "hidden md:flex flex-col",
          collapsed ? "w-28" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <span
            className={clsx(
              "text-blue-700 font-bold truncate",
              collapsed ? "text-sm" : "text-lg"
            )}
          >
            {collapsed ? "Menu" : "Desa Digital"}
          </span>

          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-blue-600"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3 flex-grow">
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

          {/* Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 p-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 mt-2"
            title={collapsed ? "Login" : ""}
          >
            <LogIn size={18} />
            {!collapsed && <span>Login</span>}
          </Link>

          {/* Register */}
          <Link
            href="/register"
            className="flex items-center gap-2 p-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            title={collapsed ? "Register" : ""}
          >
            <UserPlus size={18} />
            {!collapsed && <span>Register</span>}
          </Link>
        </nav>

        {/* Font Size Control */}
        <div className="absolute bottom-5 right-5 bg-white rounded shadow text-sm hidden md:block">
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

      {/* Sidebar Mobile */}
      {mobileOpen && (
        <div className="fixed top-0 left-0 h-screen w-full bg-white z-[10001] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-bold text-blue-700">
              Desa Digital
            </span>
            <button
              onClick={toggleMobile}
              className="text-gray-500 hover:text-blue-600"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-3 flex-grow overflow-y-auto">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleMobile}
                  className={clsx(
                    "flex items-center gap-3 p-2 rounded-md text-sm transition group",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  )}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* Login */}
            <Link
              href="/login"
              onClick={toggleMobile}
              className="flex items-center gap-2 p-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 mt-2"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>

            {/* Register */}
            <Link
              href="/register"
              onClick={toggleMobile}
              className="flex items-center gap-2 p-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <UserPlus size={18} />
              <span>Register</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
