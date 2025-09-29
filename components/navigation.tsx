"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tool", label: "LCA Tool" },
  { href: "/about", label: "About" },
  { href: "/docs", label: "Documentation" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out",
        "w-[95%] max-w-6xl",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-500/10 border border-blue-200/50"
          : "bg-white/90 backdrop-blur-lg border border-blue-200/30",
        "rounded-3xl",
      )}
    >
      <div className="px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 border border-blue-300/50 overflow-hidden hover:scale-105">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-500 transition-all duration-300">
                  VULCAN
                </span>
                <div className="text-xs text-blue-600/70 font-semibold tracking-wide">AI-Powered</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 group overflow-hidden",
                    pathname === item.href
                      ? "text-blue-700 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg shadow-blue-500/10 border border-blue-200/50"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 hover:shadow-md hover:shadow-blue-500/5",
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {pathname === item.href && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-2xl -z-0"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </>
                  )}
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                </Link>
              ))}

              {/* CTA Button */}
              <div className="ml-6">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl px-6 py-2.5 font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group border-0 hover:scale-105"
                >
                  <Link href="/tool" className="flex items-center">
                    Start Assessment
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-2xl hover:bg-blue-50/80 transition-colors duration-300 text-blue-600 border border-blue-200/30 hover:border-blue-300/50 hover:shadow-md hover:shadow-blue-500/5"
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <div className="w-full h-0.5 bg-current rounded-full"></div>
                    <div className="w-full h-0.5 bg-current rounded-full"></div>
                    <div className="w-full h-0.5 bg-current rounded-full"></div>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[400px] bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-xl border-l border-blue-200/50 shadow-2xl"
              >
                {/* Mobile Navigation Content */}
                <div className="mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-blue-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg border border-blue-300/50">
                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="object-cover w-full h-full rounded-xl"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-lg bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                        VULCAN
                      </span>
                      <div className="text-xs text-blue-600/70 font-semibold">AI-Powered</div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-300 group relative overflow-hidden",
                          pathname === item.href
                            ? "text-blue-700 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg shadow-blue-500/10 border border-blue-200/50"
                            : "text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 hover:shadow-md hover:shadow-blue-500/5 border border-transparent hover:border-blue-200/30",
                        )}
                      >
                        <span className="relative z-10 flex items-center justify-between">
                          {item.label}
                          {pathname === item.href && (
                            <span className="text-blue-500">→</span>
                          )}
                        </span>
                        {/* Background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-blue-50/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                      </Link>
                    ))}

                    {/* Mobile CTA Button */}
                    <div className="mt-8 pt-6 border-t border-blue-200/50">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl py-4 font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group border-0"
                      >
                        <Link
                          href="/tool"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center"
                        >
                          Start Assessment
                          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Link>
                      </Button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
