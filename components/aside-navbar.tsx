"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Home,
  DollarSign,
  Menu,
  X,
  FileText,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AsideNavBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const pathName = usePathname();

  const routes = [
    {
      path: "/",
      name: "Home",
      icon: Home,
    },
    {
      path: "/income",
      name: "Income",
      icon: DollarSign,
    },
    {
      path: "/expense",
      name: "Expense",
      icon: FileText,
    },
    {
      path: "/account",
      name: "Account",
      icon: CircleUserRound,
    },
  ];

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-full bg-white p-2 shadow-md md:hidden"
        onClick={() => setNavOpen(!navOpen)}
        aria-label={navOpen ? "Close menu" : "Open menu"}
      >
        {navOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`durantion-300 fixed z-40 h-screen w-64 transform bg-white transition-transform ease-in-out md:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center">
            <h1 className="text-3xl font-bold">Extra</h1>
          </div>
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`flex items-center gap-x-2 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                    pathName === route.path ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setNavOpen(false);
                  }}
                >
                  <Icon className={"h-4 w-4"} />
                  {route.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="">
          <UserButton />
        </div>
      </aside>
    </>
  );
};

export default AsideNavBar;
