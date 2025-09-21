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
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border border-border/50"
          : "bg-white/90 backdrop-blur-md border border-border/30",
        "rounded-2xl",
      )}
    >
      <div className="px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-600/25 transition-all duration-300 border border-blue-800">
                  <span className="text-white font-bold text-sm">AL</span>
                </div>
                <div className="absolute -inset-1 bg-blue-700 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  AluminumLCA
                </span>
                <div className="text-xs text-muted-foreground font-medium">AI-Powered</div>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group",
                    pathname === item.href
                      ? "text-foreground bg-blue-600/15 shadow-sm font-semibold"
                      : "text-foreground hover:text-blue-600 hover:bg-muted/80",
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 to-orange-500/15 rounded-xl -z-10"></div>
                  )}
                </Link>
              ))}

              <div className="ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-blue-600/25 transition-all duration-300 group">
                <Link href="/tool" className="flex items-center text-white">
                  Start Assessment
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl hover:bg-muted/50 transition-colors duration-300 text-foreground"
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <div className="w-full h-0.5 bg-current"></div>
                    <div className="w-full h-0.5 bg-current"></div>
                    <div className="w-full h-0.5 bg-current"></div>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-white/95 backdrop-blur-xl border-l border-border/50"
              >
                <nav className="flex flex-col space-y-2 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group",
                        pathname === item.href
                          ? "text-foreground bg-blue-600/15 shadow-sm font-semibold"
                          : "text-foreground hover:text-blue-600 hover:bg-muted/80",
                      )}
                    >
                      {item.label}
                      {pathname === item.href && <span className="inline-block ml-2">→</span>}
                    </Link>
                  ))}

                  <div className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-medium shadow-lg group">
                    <Link
                      href="/tool"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center text-white"
                    >
                      Start Assessment
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
