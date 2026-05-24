"use client";
import Link from "next/link";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {href: "/", label:"Home"},
    {href: "/menu", label:"Menu"},
    {href: "/order", label:"Order"},
    {href: "/kitchen", label:"Kitchen"},
  ];

  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-neutral-50 text-neutral-700 shadow-md">
      <div className="max-w-300 mx-auto flex items-center justify-between px-6 py-4">

        <div className="text-3xl font-mrs-sheppards text-red-500">Gastro.G</div>

        <div className="hidden md:flex justify-center gap-6">
          {navLinks.map((link) => (
            <Link
            key={link.href}
            href={link.href}
            className="hover:text-red-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Link href="/billing">
          <Button variant="primary" size="md">Checkout</Button>
          </Link>
        </div>

        <button
        onClick={() => setOpen(!open)}
        className="md:hidden focus:outline-none text-2xl"
        >
          {open ? <FaTimes className="text-red-400"/> : <FaBars />}
        </button>
      </div>

      <div 
      className={`md:hidden absolute top-full left-0 w-full bg-neutral-50 backdrop-blur-md flex flex-col items-center gap-4 pb-4 z-40 transition-all duration-300 ease-in-out"
      ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
          {navLinks.map((link) => (
            <Link
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className="hover:text-red-400 active:text-red-500 transition"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/billing">
          <Button variant="primary" size="md">Checkout</Button>
          </Link>
        </div>
    </nav>
  )
}