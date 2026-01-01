"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "../_ui/Button";
import Logo from "../_ui/Logo";
import Link from "next/link";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navItems = ["Features", "Benefits", "Testimonials", "FAQ"];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between py-6">
            <div className="z-50">
              <Logo />
            </div>

            <ul className="hidden md:flex items-center gap-8 text-neutral-600 font-medium">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="cursor-pointer hover:text-neutral-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <Button>Get Started</Button>
            </div>

            <button
              className="md:hidden z-50 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-neutral-700" />
              ) : (
                <Menu size={24} className="text-neutral-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white z-40 md:hidden shadow-2xl transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li
                  key={item}
                  className={`transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 50}ms`
                      : "0ms",
                  }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 px-4 text-neutral-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/login"
            className={`pb-8 transition-all duration-300 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "200ms" : "0ms",
            }}
          >
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
