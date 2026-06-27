"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "../Typography";
import style from "./_.module.css";

import {
  navigation as navItems,
  NavigationType,
} from "@/constant/navigation.items";
import { useState } from "react";

export default function Navbar({
  webName,
}: {
  webName: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    if (path.startsWith("/article")) {
      return pathname.startsWith("/article");
    }
    if (path === "/"){
      return pathname === "/" || pathname.startsWith("/users");
  
    }

    return pathname === path;
  };

  return (
    <nav className={style.containerNav}>
      <section className={style.logo}>
        <Typography className={style.logoName}>
          {webName}
        </Typography>

        <Typography variant="p" color="darkgray">
          By Farras Hafish Zidane
        </Typography>
      </section>

      {/* Hamburger */}

      <button
        className={style.hamburger}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Navigation */}

      <section
        className={`${style.navigation} ${
          open ? style.open : ""
        }`}
      >
        <Typography variant="p">
          Answer:
        </Typography>

        <div className={style.navigationItems}>
          {navItems.map((item: NavigationType) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`${style.navButton} ${
                  isActive(item.path) ? style.activeButton : ""
                }`
              }
            >
              {item.answerNum}
            </Link>
          ))}
        </div>
      </section>
    </nav>
  );
}