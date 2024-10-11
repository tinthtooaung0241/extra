"use client";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NavBar = () => {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/income",
      label: "Income",
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-10">
            <UserButton />
            <div className="hidden items-center justify-evenly gap-x-2 md:flex">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-lg ${
                    pathName === route.href && "text-green-300"
                  } px-3 py-2`}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className={`${menuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="flex flex-col space-y-2 pb-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="flex w-full items-center justify-center text-lg hover:text-green-700"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
